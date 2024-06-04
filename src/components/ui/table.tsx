
import {
    Table,
    Box,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableSortLabel,
    Paper,
    Skeleton,
    Button,
} from "@mui/material";
    import VisibilityIcon from '@mui/icons-material/Visibility';
    import { useNavigate } from "react-router-dom";

    import { Props } from "../../interface/global";
    import  ModalBrand from "../modals/brand"
    import ModalCategory from "../modals/category";
    import ModalDelete from "../modals/delete"
    import SubCategory from "../modals/subCategory";

    function GLobalTable({ heders, body, skelatonLoader }: Props) {

    const navigate = useNavigate();
    return (
        <>
        
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
                <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
            >
                <TableHead>
                    <TableRow>
                        {heders?.map((header:any, index:any) => {
                        return (
                            <TableCell key={index}>
                            <TableSortLabel>{header.title}</TableSortLabel>
                            </TableCell>
                        );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        skelatonLoader ? Array.from(new Array(5)).map((_, index)=>{
                        return <TableRow key={index}>
                            {
                            heders?.map((_:any, item:any)=>{
                                return <TableCell key={item}><Skeleton /></TableCell>
                            })
                            }
                        </TableRow> 
                    })

                    :  body?.length > 0 ?  
                    body?.map((body:any, index:any)=>{
                        return <TableRow key={index}>
                            {
                            heders?.map((header:any, item:any)=>{
                                return <TableCell key={item}>{
                                header.value == "action" ? <div className="flex items-center gap-2">
                                    <button className=' text-gray-500'><ModalDelete id={body?.id} title="brand"/></button>
                                        <ModalBrand title="put" id={body?.id} data={body}/>
                                </div>
                                :header.value == "action2" ? <div className="flex items-center gap-2">
                                    <button className=' text-gray-500'><ModalDelete id={body?.id} title="category"/></button>
                                    <ModalCategory title="put" id={body?.id} data={body}/>
                                    <Button sx={{color: '#767676' }} onClick={()=>{navigate(`/home/category/${body?.id}`)}}  className=' text-gray-500'><VisibilityIcon/></Button>
                                </div>
                                :header.value == "action3" ? <div className="flex items-center gap-2">
                                <button className=' text-gray-500'><ModalDelete id={body?.id} title="category"/></button>
                                <SubCategory title="put" id={body?.id} data={body}/>
                            </div>
                                : header.value == "t/r" ? <p>{index + 1 }</p>
                                : (body[header.value])
                                }</TableCell>
                            })
                            }
                        </TableRow>
                        })
                        : <TableRow>
                        <TableCell colSpan={heders?.length}>No information yet</TableCell>
                        </TableRow>
                    }
                </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </Box>
        </>
    );
}
export default GLobalTable;