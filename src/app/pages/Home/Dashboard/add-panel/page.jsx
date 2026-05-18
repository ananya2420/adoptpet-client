"use client";

import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button, Card } from "@heroui/react";
import React, { useState } from "react";

const AddPetPanel = () => {
  const [ownerEmail, setOwnerEmail] = useState("");
  const [isEmailLocked, setIsEmailLocked] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pet = Object.fromEntries(formData.entries());

    pet.ownerEmail = ownerEmail;

    //console.log("Submitting Pet Data:", pet);

    const res = await fetch('http://localhost:5000/pet', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(pet)
    });
    const data = await res.json();

    console.log(data);
  };

  const handleEmailBlur = () => {
    if (ownerEmail.trim() !== "") {
      setIsEmailLocked(true);
    }
  };

  return (
    <div className="p-5 max-w-7xl mx-auto bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">Pet Information</h1>

      <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <form onSubmit={onSubmit} className="p-10 space-y-8 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Owner Email - Locks after entering once */}
            <div className="md:col-span-2">
              <TextField isRequired={!isEmailLocked}>
                <Label className="text-black font-medium">Owner Email</Label>
                <Input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  disabled={isEmailLocked}
                  placeholder="your.email@example.com"
                  className={`rounded-2xl transition-all text-black ${
                    isEmailLocked ? "opacity-60 bg-gray-100 border-emerald-600 text-black" : ""
                  }`}
                />
                {isEmailLocked && (
                  <p className="text-xs text-emerald-600 mt-1">✓ Email locked for this listing</p>
                )}
                <FieldError className="text-red-500 text-xs" />
              </TextField>
            </div>

            {/* Pet Name */}
            <div className="md:col-span-2">
              <TextField name="petName" isRequired>
                <Label className="text-black font-medium">Pet Name</Label>
                <Input placeholder="e.g. Buddy, Max, Bella, Daisy" className="rounded-2xl text-black" />
                <FieldError className="text-red-500 text-xs" />
              </TextField>
            </div>

            {/* Breed */}
            <TextField name="breed" isRequired>
              <Label className="text-black font-medium">Breed</Label>
              <Input placeholder="e.g. Golden Retriever, Persian" className="rounded-2xl text-black" />
              <FieldError className="text-red-500 text-xs" />
            </TextField>

            {/* Species / Category Select */}
            <div>
              <Select
                name="species"
                isRequired
                className="w-full"
                placeholder="Select species"
              >
                <Label className="text-black font-medium">Species</Label>
                <Select.Trigger className="rounded-2xl bg-white text-black border border-gray-300">
                  <Select.Value className="text-black" />
                  <Select.Indicator className="text-black" />
                </Select.Trigger>
                <Select.Popover className="bg-white border border-gray-200 text-black shadow-xl">
                  <ListBox className="text-black">
                    <ListBox.Item id="Dog" textValue="Dog" className="text-black">Dog</ListBox.Item>
                    <ListBox.Item id="Cat" textValue="Cat" className="text-black">Cat</ListBox.Item>
                    <ListBox.Item id="Bird" textValue="Bird" className="text-black">Bird</ListBox.Item>
                    <ListBox.Item id="Rabbit" textValue="Rabbit" className="text-black">Rabbit</ListBox.Item>
                    <ListBox.Item id="Other" textValue="Other" className="text-black">Other</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Gender Select */}
            <div>
              <Select
                name="gender"
                isRequired
                className="w-full"
                placeholder="Select gender"
              >
                <Label className="text-black font-medium">Gender</Label>
                <Select.Trigger className="rounded-2xl bg-white text-black border border-gray-300">
                  <Select.Value className="text-black" />
                  <Select.Indicator className="text-black" />
                </Select.Trigger>
                <Select.Popover className="bg-white border border-gray-200 text-black shadow-xl">
                  <ListBox className="text-black">
                    <ListBox.Item id="Male" textValue="Male" className="text-black">Male</ListBox.Item>
                    <ListBox.Item id="Female" textValue="Female" className="text-black">Female</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Age */}
            <TextField name="age" isRequired>
              <Label className="text-black font-medium">Age</Label>
              <Input placeholder="e.g. 2 Years / 3 Months" className="rounded-2xl text-black" />
              <FieldError className="text-red-500 text-xs" />
            </TextField>

            {/* Vaccination Status */}
            <div>
              <Select
                name="vaccinationStatus"
                isRequired
                className="w-full"
                placeholder="Select status"
              >
                <Label className="text-black font-medium">Vaccination Status</Label>
                <Select.Trigger className="rounded-2xl bg-white text-black border border-gray-300">
                  <Select.Value className="text-black" />
                  <Select.Indicator className="text-black" />
                </Select.Trigger>
                <Select.Popover className="bg-white border border-gray-200 text-black shadow-xl">
                  <ListBox className="text-black">
                    <ListBox.Item id="Vaccinated" textValue="Vaccinated" className="text-black">Vaccinated</ListBox.Item>
                    <ListBox.Item id="Not Vaccinated" textValue="Not Vaccinated" className="text-black">Not Vaccinated</ListBox.Item>
                    <ListBox.Item id="Partially Vaccinated" textValue="Partially Vaccinated" className="text-black">Partially Vaccinated</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Health Status */}
            <div>
              <Select
                name="healthStatus"
                isRequired
                className="w-full"
                placeholder="Select health status"
              >
                <Label className="text-black font-medium">Health Status</Label>
                <Select.Trigger className="rounded-2xl bg-white text-black border border-gray-300">
                  <Select.Value className="text-black" />
                  <Select.Indicator className="text-black" />
                </Select.Trigger>
                <Select.Popover className="bg-white border border-gray-200 text-black shadow-xl">
                  <ListBox className="text-black">
                    <ListBox.Item id="Healthy" textValue="Healthy" className="text-black">Perfectly Healthy</ListBox.Item>
                    <ListBox.Item id="Minor Treatment" textValue="Minor Treatment" className="text-black">Under Routine Treatment</ListBox.Item>
                    <ListBox.Item id="Special Needs" textValue="Special Needs" className="text-black">Special Needs Care Required</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Pet Image URL */}
            <div className="md:col-span-2">
              <TextField name="imageUrl" isRequired>
                <Label className="text-black font-medium">Pet Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/your-pet-image.jpg"
                  className="rounded-2xl text-black"
                />
                <FieldError className="text-red-500 text-xs" />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className="text-black font-medium">Description</Label>
                <TextArea
                  placeholder="Share details about the pet's personality, habits, and background story..."
                  className="rounded-3xl min-h-[120px] text-black"
                />
                <FieldError className="text-red-500 text-xs" />
              </TextField>
            </div>
          </div>

          {/* Action Buttons: Cancel and Add Pet Listing */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="button"
              className="rounded-xl w-full sm:w-1/2 border border-gray-300 bg-white text-black hover:bg-gray-100 transition font-medium"
              onClick={() => {
                if (confirm("Are you sure you want to discard this layout panel entry?")) {
                  setOwnerEmail("");
                  setIsEmailLocked(false);
                }
              }}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              className="rounded-xl w-full sm:w-1/2 bg-green-600 hover:bg-green-500 text-white font-medium transition shadow-lg shadow-emerald-600/20 active:scale-98"
            >
              Add Pet Listing
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddPetPanel;
