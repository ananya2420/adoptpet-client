"use client";

import { Button, FieldError, Input, Label, ListBox, Modal, Surface, TextArea, TextField, Select } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";

export function EditModal({ pet }) {
 
  const { _id, imageUrl, age, petName, vaccinationStatus, healthStatus, species, location, description, status } = pet;

 
  const [selectedVaccine, setSelectedVaccine] = useState(vaccinationStatus || "vaccinated");
  const [selectedStatus, setSelectedStatus] = useState(status || "available");

  const onSubmit = async (e) => {

    if (!petId || petId === "undefined") {
      console.error("The pet object passed to this modal is missing both _id and id properties:", pet);
      alert("Error: Cannot update pet. Missing valid ID.");
      return;
    }
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    

    const submittedData = Object.fromEntries(formData.entries());

  
    submittedData.vaccinationStatus = Array.from(selectedVaccine)[0] || selectedVaccine;
    submittedData.status = Array.from(selectedStatus)[0] || selectedStatus;

    console.log("Submitting changes:", submittedData);

  
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submittedData)
    });

    const data = await res.json();
    console.log(data);
    if(res.ok) {
       alert("Changes saved successfully!");
    }
  }; 

  return (
    <Modal>
      <div className="flex justify-end">
        <Button variant="outline" className="rounded-none mt-5 mb-3 flex bg-green-600 text-white gap-2">
          <BiEdit /> Edit Pet
        </Button>
      </div>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Pet Profile</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="p-6 space-y-6 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Pet Name */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={petName} name="petName" isRequired>
                        <Label>Pet Name</Label>
                        <Input placeholder="e.g. Max" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Species */}
                    <div>
                      <TextField defaultValue={species} name="species" isRequired>
                        <Label>Species</Label>
                        <Input placeholder="e.g. Dog, Cat" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Age */}
                    <div>
                      <TextField defaultValue={age} name="age" type="number" isRequired>
                        <Label>Age (Years/Months)</Label>
                        <Input placeholder="e.g. 2" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                 
<div className="md:col-span-2">
  <TextField defaultValue={location} name="location" isRequired>
    <Label>Location</Label>
    <Input placeholder="e.g. Los Angeles, CA" className="rounded-2xl" />
    <FieldError />
  </TextField>
</div>

                    {/* Vaccination Status */}
                    <div>
                      <Select
                        name="vaccinationStatus"
                        selectedKeys={[selectedVaccine]}
                        onSelectionChange={setSelectedVaccine}
                        isRequired
                        className="w-full"
                      >
                        <Label>Vaccination Status</Label>
                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="vaccinated" textValue="Vaccinated">Vaccinated</ListBox.Item>
                            <ListBox.Item id="not-vaccinated" textValue="Not Vaccinated">Not Vaccinated</ListBox.Item>
                            <ListBox.Item id="partially-vaccinated" textValue="Partially Vaccinated">Partially Vaccinated</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Adoption Status */}
                    <div>
                      <Select
                        name="status"
                        selectedKeys={[selectedStatus]}
                        onSelectionChange={setSelectedStatus}
                        isRequired
                        className="w-full"
                      >
                        <Label>Adoption Status</Label>
                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="available" textValue="Available">Available</ListBox.Item>
                            <ListBox.Item id="adopted" textValue="Adopted">Adopted</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Health Status */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={healthStatus} name="healthStatus" isRequired>
                        <Label>Health Status Details</Label>
                        <Input placeholder="e.g. Healthy, Neutered, Spayed" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
                        <Label>Image URL</Label>
                        <Input type="url" placeholder="https://example.com/pet.jpg" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={description} name="description" isRequired>
                        <Label>Description</Label>
                        <TextArea placeholder="Describe the pet's personality, habits..." className="rounded-3xl" />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Form Submission Button */}
                  <Button
                    type="submit"
                    variant="outline"
                    className="rounded-none w-full bg-green-500 text-white mt-4"
                  >
                    Save Pet Changes
                  </Button>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary" className="text-green-500">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}