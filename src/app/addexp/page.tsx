"use client";
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"



export default function page() {

  return (
    <>
    <div>
    <h1 className='text-center'>Add Yours Expenses </h1>
    <Form />
    </div>

    </>
  )
}

const Form = () => {
  const { toast } = useToast()
    const [formData, setFormData] = useState({
      description: '',
      amount: '',
      category: '',
      date: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/exp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        toast({
          title: "Uh oh! Failed to submit form.",
          description: "There was a problem with your request.",
        })
        throw new Error('Failed to submit form');
      }
      console.log('Form submitted successfully');
      toast({
        title: "Form submitted successfully",
        description: "Your form has been submitted successfully.",
      })
    } catch (error) {
      toast({
        title: "Uh oh! Failed to submit form.",
        description: "There was a problem with your request.",
      })
      console.error('Error submitting form:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto ">
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Custom Category</option>
          <option value="Shopping">Shopping</option>
          <option value="Electricity">Electricity</option>
          <option value="Houses">Houses</option>
          <option value="Travel">Travel</option>
          <option value="Food & Drink">Food & Drink</option>
        </select>
        {formData.category === "" && (
          <input type="text" id="customCategory" name="customCategory" value={formData.customCategory} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder="Custom Category" />
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
      </div>
      <div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit</button>
      </div>
    </form>
  )
}

