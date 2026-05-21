"use client";

import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button, Card } from "@heroui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddPetPanel = () => {
  const [ownerEmail, setOwnerEmail] = useState("");
  const [isEmailLocked, setIsEmailLocked] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pet = Object.fromEntries(formData.entries());

    pet.ownerEmail = ownerEmail;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(pet)
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("🎉 Your pet has been listed successfully!");
      // Force Next.js to purge its client-side cache and fetch the latest database data
      router.refresh();
      router.push("/pages/Home/Dashboard?tab=my-listings");
    }
  };

  const handleEmailBlur = () => {
    if (ownerEmail.trim() !== "") {
      setIsEmailLocked(true);
    }
  };

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto min-h-screen bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Create Pet Listing
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Provide accurate details to help your pet find its perfect forever home.
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 shadow-xl rounded-2xl overflow-hidden p-6 sm:p-10">
        <form onSubmit={onSubmit} className="space-y-8">
          
          {/* Section 1: Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 pb-2 mb-4">
              1. Owner Details
            </h3>
            <div className="w-full">
              <TextField isRequired={!isEmailLocked}>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">
                  Owner Email
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    disabled={isEmailLocked}
                    placeholder="your.email@example.com"
                    className={`rounded-xl transition-all w-full border text-gray-900 dark:text-white bg-transparent ${
                      isEmailLocked 
                        ? "bg-gray-50 dark:bg-gray-900/50 border-emerald-500/50 opacity-80" 
                        : "border-gray-300 dark:border-gray-600 focus:border-green-500"
                    }`}
                  />
                </div>
                {isEmailLocked && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1 font-medium">
                    ✓ Email locked for this listing
                  </p>
                )}
                <FieldError className="text-rose-500 text-xs mt-1" />
              </TextField>
            </div>
          </div>

          {/* Section 2: Pet Identity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 pb-2 mb-4">
              2. Pet Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <TextField name="petName" isRequired>
                  <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Pet Name</Label>
                  <Input placeholder="e.g. Buddy, Max, Bella, Daisy" className="rounded-xl w-full text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600" />
                  <FieldError className="text-rose-500 text-xs mt-1" />
                </TextField>
              </div>

              <TextField name="breed" isRequired>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Breed</Label>
                <Input placeholder="e.g. Golden Retriever, Persian" className="rounded-xl w-full text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600" />
                <FieldError className="text-rose-500 text-xs mt-1" />
              </TextField>

              <div>
                <Select name="species" isRequired className="w-full" placeholder="Select species">
                  <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Species</Label>
                  <Select.Trigger className="rounded-xl bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 min-h-[42px]">
                    <Select.Value className="text-gray-900 dark:text-white" />
                    <Select.Indicator className="text-gray-500" />
                  </Select.Trigger>
                  <Select.Popover className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-xl rounded-xl">
                    <ListBox className="p-1">
                      <ListBox.Item id="Dog" textValue="Dog" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Dog</ListBox.Item>
                      <ListBox.Item id="Cat" textValue="Cat" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Cat</ListBox.Item>
                      <ListBox.Item id="Bird" textValue="Bird" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Bird</ListBox.Item>
                      <ListBox.Item id="Rabbit" textValue="Rabbit" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Rabbit</ListBox.Item>
                      <ListBox.Item id="Other" textValue="Other" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Other</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>
          </div>

          {/* Section 3: Health & Logistics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 pb-2 mb-4">
              3. Health & Logistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <Select name="gender" isRequired className="w-full" placeholder="Select gender">
                  <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Gender</Label>
                  <Select.Trigger className="rounded-xl bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 min-h-[42px]">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-xl rounded-xl">
                    <ListBox className="p-1">
                      <ListBox.Item id="Male" textValue="Male" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Male</ListBox.Item>
                      <ListBox.Item id="Female" textValue="Female" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Female</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField name="age" isRequired>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Age</Label>
                <Input placeholder="e.g. 2 Years / 3 Months" className="rounded-xl w-full text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600" />
                <FieldError className="text-rose-500 text-xs mt-1" />
              </TextField>

              <div>
                <Select name="vaccinationStatus" isRequired className="w-full" placeholder="Select status">
                  <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Vaccination</Label>
                  <Select.Trigger className="rounded-xl bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 min-h-[42px]">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-xl rounded-xl">
                    <ListBox className="p-1">
                      <ListBox.Item id="Vaccinated" textValue="Vaccinated" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Vaccinated</ListBox.Item>
                      <ListBox.Item id="Not Vaccinated" textValue="Not Vaccinated" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Not Vaccinated</ListBox.Item>
                      <ListBox.Item id="Partially Vaccinated" textValue="Partially Vaccinated" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Partially</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div>
                <Select name="healthStatus" isRequired className="w-full" placeholder="Select health status">
                  <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Health Status</Label>
                  <Select.Trigger className="rounded-xl bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 min-h-[42px]">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-xl rounded-xl">
                    <ListBox className="p-1">
                      <ListBox.Item id="Healthy" textValue="Healthy" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Perfectly Healthy</ListBox.Item>
                      <ListBox.Item id="Minor Treatment" textValue="Minor Treatment" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Routine Treatment</ListBox.Item>
                      <ListBox.Item id="Special Needs" textValue="Special Needs" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2">Special Needs</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField name="location" isRequired>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Location</Label>
                <Input placeholder="e.g. Los Angeles, CA" className="rounded-xl w-full text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600" />
                <FieldError className="text-rose-500 text-xs mt-1" />
              </TextField>

              <TextField name="adoptionFee" isRequired>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Adoption Fee ($)</Label>
                <Input type="number" min="0" placeholder="e.g. 50" className="rounded-xl w-full text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600" />
                <FieldError className="text-rose-500 text-xs mt-1" />
              </TextField>
            </div>
          </div>

          {/* Section 4: Details & Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 pb-2 mb-4">
              4. Media & Profile
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <TextField name="imageUrl" isRequired>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Pet Image URL</Label>
                <Input type="url" placeholder="https://example.com/your-pet-image.jpg" className="rounded-xl w-full text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600" />
                <FieldError className="text-rose-500 text-xs mt-1" />
              </TextField>

              <TextField name="description" isRequired>
                <Label className="text-gray-700 dark:text-gray-300 font-medium mb-1.5 block text-sm">Description</Label>
                <TextArea
                  placeholder="Share details about the pet's personality, habits, and background story..."
                  className="rounded-xl min-h-[130px] w-full text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600 p-3"
                />
                <FieldError className="text-rose-500 text-xs mt-1" />
              </TextField>
            </div>
          </div>

          {/* Action Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
            <Button
              type="button"
              className="rounded-xl w-full sm:w-1/2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition font-semibold py-2.5"
              onClick={() => {
                if (confirm("Are you sure you want to discard this entry?")) {
                  setOwnerEmail("");
                  setIsEmailLocked(false);
                }
              }}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              className="rounded-xl w-full sm:w-1/2 bg-green-600 hover:bg-green-500 text-white font-semibold transition shadow-md shadow-green-600/10 active:scale-[0.99] py-2.5"
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