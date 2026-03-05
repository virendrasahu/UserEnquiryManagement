import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export function EnquiryList({data, getAllEnquiry, Swal, setFormData}) {
  let deleteRow=(delid)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${import.meta.env.VITE_API_URL}/api/enquiry/delete/${delid}`)
        .then(res=>{
          console.log(res.data);
          toast.success('Enquiry deleted successfully');
          getAllEnquiry()
        }
        )
        .catch(err=>{
          console.error('Failed to delete enquiry', err);
          toast.error('Failed to delete enquiry');
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
      else {
        Swal.fire({
          title: "Cancelled",
          text: "Your file is safe :)",
          icon: "error"
        });
      }
    });
    
  }

  let editRow=(id)=>{
    axios.get(`${import.meta.env.VITE_API_URL}/api/enquiry/single/${id}`)
    .then(res=>{
      setFormData(res.data.data);
    })
    .catch(err=>{
      console.error('Failed to fetch enquiry details', err);
    })
    
  }
    return (   
      <div>
        <h1 className='text-[20px] font-bold '>
            Enquiry List
        </h1> 
        <div className="bg-gray-200 p-4 mb-4 overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>S. No</TableHeadCell>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Email</TableHeadCell>
                  <TableHeadCell>Phone</TableHeadCell>
                  <TableHeadCell>Message</TableHeadCell>
                  <TableHeadCell>Delete</TableHeadCell>
                  <TableHeadCell>Edit</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">Edit</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>


              <TableBody className="divide-y">
                  {
                    data.length >= 1 ?
                    data.map((item, index) => {
                      return (
                        <>
                        <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell> 
                          <TableCell>{item.email}</TableCell> 
                          <TableCell>{item.phone}</TableCell> 
                          <TableCell>{item.message}</TableCell> 
                          <TableCell>
                            <button onClick={()=>deleteRow(item._id)} className="font-medium text-red-600 hover:underline dark:text-red-500">
                              Delete
                            </button>
                          </TableCell>
                          <TableCell>
                            <button onClick={()=>editRow(item._id)} className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                              Edit
                            </button>
                          </TableCell>                                               
                          </TableRow>                    
                        </>
                      )
                    }):
                    (<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="text-center" colSpan="7">
                        No Enquiry Found
                      </TableCell>
                    </TableRow>) 
                  }
              </TableBody>
            </Table>
          </div>
          </div>
    )
}



