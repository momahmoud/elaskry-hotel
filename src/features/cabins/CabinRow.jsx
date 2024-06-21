import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicateCabin() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  // const isWorking = isCreating || isDeleting;

  return (
    <>
      <Table.Row>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price> {formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          {/* <button onClick={() => handleDuplicateCabin()} disabled={isWorking}>
            <HiSquare2Stack />
          </button> */}

          {/* <Modal>
            <Modal.Open opens="edit">
              <button disabled={isWorking}>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Content name="edit">
              <CreateCabinForm cabin={cabin} />
            </Modal.Content>

            <Modal.Open opens="delete">
              <button disabled={isWorking}>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Content name="delete">
              <ConfirmDelete
                resourceName="Cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Content>
          </Modal> */}

          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} disabled={isCreating || isDeleting} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  onClick={() => handleDuplicateCabin()}
                  icon={<HiSquare2Stack />}
                  name="duplicate"
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button
                    onClick={() => createCabin(cabin)}
                    icon={<HiPencil />}
                    name="edit"
                    disabled={isCreating}
                  >
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button
                    onClick={() => deleteCabin(cabinId)}
                    icon={<HiTrash />}
                    name="delete"
                    disabled={isDeleting}
                  >
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Content name="edit">
                <CreateCabinForm cabin={cabin} />
              </Modal.Content>

              <Modal.Content name="delete">
                <ConfirmDelete
                  resourceName="Cabins"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabinId)}
                />
              </Modal.Content>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
