import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  TextInput,
  Label,
  Dropdown,
  DropdownItem,
  TableCell,
  TableRow,
  Checkbox,
  Avatar,
  Textarea,
  FileInput,
} from "flowbite-react";
import DropdownLimit from "../components/DropdownLimit";
import { MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import useLicenses from "../hooks/useLisenses";
import { IMAGE_URL } from "../config/config";
import { LicenseInterface, newLicenseInterface } from "../interfaces/LicenseInterface";
import { uploadFile } from "../services/uploadServices";

const Licences: React.FC = () => {

  const newLicense = {
    type: "",
    name: "",
    description: "",
    state: true,
    cost: 0,
    image: 0,
  };
  const [limit, setLimit] = useState(10);
  const [licences, setLicences] = useState<LicenseInterface[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLicence, setCurrentLicence] = useState<newLicenseInterface>(newLicense);
  const {pagination,licenses, saveLicense } = useLicenses(1, limit, "");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [id, setId] = useState<number>(0)

  useEffect(() => {
   
  }, []);

  const handleAdd = () => {
    setCurrentLicence(newLicense);
    setId(0)
    setShowModal(true);
  };

  const handleEdit = (license: LicenseInterface) => {
    const newCurrent: newLicenseInterface = {
      type: license.type,
      name: license.name,
      description: license.description,
      state: license.state,
      cost: license.cost,
      image: license.image.id
    } 
    setCurrentLicence(newCurrent);
    setId(license.id)
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setLicences(licences.filter((licence) => licence.id !== id));
  };

  const uploadImage = async(file: File) =>{
    const response = await uploadFile(file);
    return response;
  }
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImagePreview(reader.result as string);
        try {
          const imageId = await uploadImage(file)
          console.log('IMAGE ID',imageId[0].id)
          setCurrentLicence({
            ...currentLicence,
            image: imageId[0].id
          })
        } catch (error) {
          console.log("Error setting image ID:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (currentLicence) {
      if (id === 0) {
        saveLicense(currentLicence)
      } else {
        
      }
      setShowModal(false);
    }
  };

  const handleSelect = (value: number) => {
    //setPage(1);
    setLimit(value);
  };

  return (
    <div className="container mx-auto p-4">
      {/* First Row */}
      <div className="mb-8 grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <h3 className="text-3xl font-bold dark:text-white">Licencias</h3>
          {pagination ? (
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Registros: {pagination.total}
            </p>
          ) : null}
        </div>
        <div className="col-span-6 flex items-center justify-end">
          <Button
            className="rounded-lg bg-blue-700  font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleAdd()}
            color={"blue"}
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            <div>Agregar</div>
          </Button>
        </div>
      </div>

      {/* Second Row */}
      <div className="mb-4 grid grid-cols-12 gap-4">
        <div className="col-span-6 flex items-center space-x-4">
          <Dropdown
            label="Buscar por"
            inline
            className="rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            // value={searchBy}
            // onChange={(e) => setSearchBy(e.target.value)}
          >
            <Dropdown.Item value="name">Nombre</Dropdown.Item>
            <Dropdown.Item value="description">Descripción</Dropdown.Item>
          </Dropdown>
          <div className="relative w-64">
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Buscar..."
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            className="rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => console.log("Buscar")}
            color={"blue"}
          >
            <MagnifyingGlassIcon className="h-5 w-5 dark:text-gray-400" />
          </Button>
        </div>
        <div className="col-span-6 flex items-center justify-end">
          <Label className="mr-4" htmlFor="limit">
            Mostrar
          </Label>
          <DropdownLimit limit={10} onSelect={handleSelect} />
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 overflow-x-auto">
          {/* Table goes here */}
          <Table striped>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox color={"blue"} />
              </Table.HeadCell>
              <Table.HeadCell>Tipo</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Descripción</Table.HeadCell>
              <Table.HeadCell>Imagen</Table.HeadCell>
              <Table.HeadCell>Costo</Table.HeadCell>
              <Table.HeadCell>Estado</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {licenses.map((license) => (
                <TableRow key={license.id}>
                  <Table.Cell className="p-4">
                    <Checkbox color={"blue"} />
                  </Table.Cell>
                  <TableCell>{license.type}</TableCell>
                  <TableCell>{license.name}</TableCell>
                  <TableCell>{license.description}</TableCell>
                  <TableCell>
                    <Avatar img={`${IMAGE_URL}${license.image.url}`} />
                  </TableCell>
                  <TableCell>${license.cost}</TableCell>
                  <TableCell>{license.state ? "Activo" : "Inactivo"}</TableCell>
                  <Table.Cell>
                    <Dropdown
                      label={
                        <strong className="text-lg text-gray-500 dark:text-gray-400 dark:hover:text-white">
                          ...
                        </strong>
                      }
                      inline
                      placement="left"
                      arrowIcon={false}
                    >
                      <DropdownItem onClick={() => handleEdit(license)}>
                        <PencilSquareIcon
                          color="green"
                          className="mr-3 h-5 w-5"
                        />
                        Editar
                      </DropdownItem>
                      <DropdownItem onClick={() => handleDelete(license.id)}>
                        <TrashIcon color="red" className="mr-3 h-5 w-5" />
                        Eliminar
                      </DropdownItem>
                    </Dropdown>
                  </Table.Cell>
                </TableRow>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>

      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>
            {currentLicence ? "Agregar Licencia" : "Editar Licencia"}
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="type">Tipo</Label>
                <TextInput
                  id="type"
                  value={currentLicence.type}
                  onChange={(e) =>
                    setCurrentLicence({
                      ...currentLicence,
                      type: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="name">Nombre</Label>
                <TextInput
                  id="name"
                  value={currentLicence.name}
                  onChange={(e) =>
                    setCurrentLicence({
                      ...currentLicence,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cost">Costo</Label>
                <TextInput
                  id="cost"
                  type="number"
                  value={currentLicence.cost}
                  onChange={(e) =>
                    setCurrentLicence({
                      ...currentLicence,
                      cost: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="state"
                  checked={currentLicence.state}
                  onChange={(e) =>
                    setCurrentLicence({
                      ...currentLicence,
                      state: e.target.checked,
                    })
                  }
                />
                <Label htmlFor="state" className="ml-2">
                  Activo
                </Label>
              </div>
              <div className="col-span-2">
                <Label htmlFor="image">Imagen</Label>
                <FileInput
                  id="image"
                  color={'blue'}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="mt-2 h-32 w-32 object-cover"
                  />
                )}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={currentLicence.description}
                required
                rows={4}
                onChange={(e) =>
                  setCurrentLicence({
                    ...currentLicence,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSave}>Guardar</Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Licences;
