import { useEffect, useState } from "react";
import auth from "@servicesAuth";
import { getDataFromCookie } from "../../utils/data-service";
import Swat from '../../assets/image/swat.jpg';
import Logo from '../../assets/icon/TexnoArkLogo.svg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import del from "../../assets/image/delete.svg";
import edit from "../../assets/image/edit.svg";

const Index = () => {
    const navigate = useNavigate();
    const [admin_data, setAdminData] = useState<any>({});

    const getAdminDataTexno = async (id: number) => {
        try {
            const response = await auth.getAdminId(id);
            if (response.status === 200) {
                setAdminData(response.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const admin_id = Number(getDataFromCookie("admin_id"));
        getAdminDataTexno(admin_id);
    }, []);

    const backCategory = () => {
        navigate("/main");
    };

    const deleteAdmin = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            try {
                const response = await auth.deleteAdminId(id);
                if (response.status === 200) {
                    navigate("/signup");
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const editAdmin = async (id: number) => {
        try {
            const response = await auth.getAdminId(id);
            if (response.status === 200) {
                navigate("/edit");
            }
        } catch (err) {
            console.log(err);
        }
    };

    console.log(admin_data);
    return (
        <div className="h-[623px] items-center justify-center flex-col gap-8 p-5 bg-[#FFF] rounded-[10px]">
            <div className="flex">
                <img src={Swat} className='w-[500px] h-[580px] duration-500 rounded-[10px] hover:transform hover:scale-90 duration-500' />
                <div className='w-[700px] border border-solid ml-5 rounded-[10px] bg-[#F0F0F0]'>
                    <div className='w-[650px] h-[80px] bg-[#FFF] shadow-2xl rounded-[10px] flex ml-5 mt-5'>
                        <img src={Logo} className='w-[60px] h-[60px] ml-7 mt-3'/>
                        <h1 className='text-[35px] font-bold ml-2 mt-3'>TexnoArk Admin</h1>
                        <Button
                            variant='contained'
                            sx={{
                                ml: 'auto', mr: 2, mt: 2,
                                width: 150,
                                height: 50,
                                bgcolor: '#1EB91E',
                                color: '#FFF',
                                ":hover": { bgcolor: '#1EB91E' }
                            }}
                            onClick={backCategory}
                        >
                            Back
                        </Button>
                    </div>
                    <div className='w-[650px] h-[440px] bg-[#FFF] shadow-2xl rounded-[10px] ml-5 mt-5 flex gap-3'>
                        <div className="w-[310px] pt-10 ">
                            <h1 className="font-semibold ml-[20px] text-lg text-gray-600 ">Ismi: {admin_data?.first_name}</h1>
                            <h1 className="font-semibold ml-[20px] text-lg text-gray-600 mt-3">Familiyasi: {admin_data?.last_name}</h1>
                            <h1 className="font-semibold ml-[20px] text-lg text-gray-600 mt-3">Telefon raqami: {admin_data?.phone_number}</h1>
                            <h1 className="font-semibold ml-[20px] text-lg text-gray-600 mt-3">Email: {admin_data?.email}</h1>
                        </div>

                        <div className="w-[330px] pt-10">
                            <h1 className="font-semibold ml-[20px] text-lg text-gray-600 ">Created_Data: {admin_data?.createdAt ? admin_data?.createdAt.slice(0, 10) : ""}</h1>
                            <h1 className="font-semibold ml-[20px] text-lg text-gray-600 ">Updated_Data: {admin_data?.lastUpdate ? admin_data.lastUpdateAt.slice(0, 10) : ""}</h1>
                            <div className="flex ml-[20px] mt-3">
                                <img src={del} className="justify-end w-[30px] h-[30px] duration-500 rounded-[10px] hover:transform hover:scale-90 duration-500 cursor-pointer hover:bg-[#F0F0F0] mt-[270px] ml-[200px]" onClick={() => deleteAdmin(admin_data?.id)} />
                                <img src={edit} className="justify-end w-[30px] h-[30px] duration-500 rounded-[10px] hover:transform hover:scale-90 duration-500 cursor-pointer hover:bg-[#F0F0F0] mt-[270px] ml-[10px]" onClick={() => editAdmin(admin_data?.id)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
