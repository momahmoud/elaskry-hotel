import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName,
        avatar: "https://i.pravatar.cc/400",
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function signIn({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let body;
  if (password) body = { password };
  if (fullName) body = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(body);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadError) {
    console.error(uploadError);
    throw new Error(uploadError.message);
  }

  const { data: updateData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) {
    console.error(updateError);
    throw new Error(updateError.message);
  }

  return updateData;
}
