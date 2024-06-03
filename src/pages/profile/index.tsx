

import Swat from '../../assets/image/swat.jpg'
import Logo from '../../assets/icon/TexnoArkLogo.svg'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Index = () => {

    const navigate = useNavigate()

    const backCategory = () => {
        navigate("/main")
    }

    return (
        <div className="h-[623px] items-center justify-center flex-col gap-8 p-5 bg-[#FFF] rounded-[10px]">
            <div className="flex">
                <img src={Swat} className='w-[500px] h-[580px] duration-500 rounded-[10px] :hover:transform hover:scale-90 duration-500' />
                <div className='w-[700px] border border-solid ml-5 rounded-[10px] bg-[#F0F0F0]'>
                    <div className='w-[650px] h-[80px] bg-[#FFF] shadow-2xl rounded-[10px] flex ml-5 mt-5'>
                        <img src={Logo} className='w-[60px] h-[60px] ml-7 mt-3'/>
                        <h1 className='text-[35px] font-bold ml-2 mt-3'>TexnoArk Admin</h1>
                        <Button
                            variant='contained'
                            sx={{
                                ml:'auto',mr:2,mt:2,
                                width:150, 
                                height:50,
                                bgcolor:'#1EB91E',
                                color:'#FFF',
                                ":hover":{bgcolor:'#1EB91E'
                        }}}
                        onClick={backCategory}
                        >  
                            Back
                        </Button>
                    </div>
                    <div className='w-[650px] h-[440px] bg-[#FFF] shadow-2xl rounded-[10px] flex ml-5 mt-5'>
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Index
