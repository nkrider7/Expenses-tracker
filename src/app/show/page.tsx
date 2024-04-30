"use client";
import React  from "react";
import { useToast } from "@/components/ui/use-toast"


const page = () => {
  const { toast } = useToast()

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/exp');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, []);

  console.log(data)
  const handleDelete = async (index) => {
    try {
      const response = await fetch(`/api/exp/${index}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        toast({
          title: "Uh oh! Failed to delete item.",
          description: "There was a problem with your request.",
        })
        throw new Error('Failed to delete item');
      }
      toast({
        title: "Item deleted successfully",
        description: "The item has been deleted successfully.",
      })
      // Remove the deleted item from the state
      setData((prevData) => prevData.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Uh oh! Failed to delete item.",
        description: "There was a problem with your request.",
      })
    }
  };


  return (
    <>
    <div><h1 className="text-center font-bold">All Expenses</h1>
    </div>
    <div className="flex justify-center flex-col p-10">
      <table className="min-w-full divide-y-2  divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium  text-gray-900">Amount</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
            <th className="px-4 py-2">Delete All</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((exp, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2  font-medium text-gray-900">₹{exp.amount}</td>
              <td className="whitespace-nowrap px-4 py-2  text-gray-700">{exp.date}</td>
              <td className="whitespace-nowrap px-4 py-2   text-gray-700">{exp.category}</td>
              <td className="whitespace-nowrap px-4 py-2  text-gray-700">{exp.description}</td>
              <td className="whitespace-nowrap px-4 flex justify-center py-2">
              <button
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  onClick={() => handleDelete(index)} // Pass index to identify the item to delete
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-10 font-semibold text-red-500">
      <h1>Total Expenses: ₹{data.reduce((total, exp) => total + exp.amount, 0)}</h1>
      </div>
    </div>
    </>
  )
}


export default page;