import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import axios from 'axios';
import { EnquiryList } from './enquiry/enquiryList';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default function Enquiry() {

  const [enquiryList, setEnquiryList] = useState([]);

  let [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const getAllEnquiry = () => {
    axios.get('${import.meta.env.VITE_API_URL}/api/enquiry/list')
      .then(res => {
        if (res.data && res.data.status === 200) {
          setEnquiryList(res.data.data);
        } else {
          console.warn('Unexpected response:', res);
          setEnquiryList([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch enquiries', err);
        setEnquiryList([]);
      });
  }
  let saveEnquiry = (e) => {
    e.preventDefault();
    // let formData={
    //   name: e.target.name.value,
    //   email: e.target.email.value,
    //   phone: e.target.phone.value,
    //   message: e.target.message.value,
    // }

    if (formData._id) {
      axios.put(`${import.meta.env.VITE_API_URL}/api/enquiry/update/${formData._id}`, formData)
        .then(() => {
          toast.success('Enquiry Updated successfully');
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            _id: ''
          });
          getAllEnquiry();
        })
        .catch(err => {
          console.error('Failed to update enquiry', err);
          toast.error('Failed to update enquiry');
        })
    }else{
      axios.post('${import.meta.env.VITE_API_URL}/api/enquiry/insert', formData)
      .then((res) => {
        console.log(res.data);
        toast.success('Enquiry Added successfully');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          _id: ''
        });
        getAllEnquiry();
      })
    }

    
  }


  let getValue = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value;
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData)
  }

  useEffect(() => {
    getAllEnquiry();
  }, [])
  return (
    <div>
      <ToastContainer />
      <h1 className='text-[40px] text-center py-6 font-bold'>
        User Enquiry
      </h1>


      <div className='grid grid-cols-[30%_auto] gap-10'>
        <div className='bg-gray-200 p-4'>
          <h2 className='text-[20px] font-bold'>Enquiry Form</h2>

          <form action="" onSubmit={saveEnquiry} className='py-3'>
            <div className='py-3'>
              <Label htmlFor="name" value="Your Name">Name</Label>
              <TextInput id="name" value={formData.name} onChange={getValue} type="text" name='name' placeholder="Your Name" required />

            </div>
            <div className='py-3'>
              <Label htmlFor="email" value="Your Email">Email</Label>
              <TextInput id="email" value={formData.email} onChange={getValue} type="email" name='email' placeholder="name@flowbite.com" required />
            </div>

            <div className='py-3'>
              <Label htmlFor='phone' value="Your Phone Number" >Phone Number</Label>
              <TextInput id="phone" value={formData.phone} onChange={getValue} type="text" name='phone' placeholder="Your Phone Number" required />
            </div>
            <div className='py-3'>
              <Label htmlFor="message" value="Your Message">Message</Label>
              <Textarea id="message" value={formData.message} onChange={getValue} name='message' placeholder="Your Message" required rows={4} />
            </div>
            <div className='py-3'>
              <Button className='bg-blue-600' type="submit">
                {formData._id ? 'Update' : 'Save'}
              </Button>
            </div>

          </form>
        </div>
        
          <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} Swal={Swal} setFormData={setFormData}/>
      </div>

    </div>
  )

}
