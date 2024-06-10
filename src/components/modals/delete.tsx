import * as React from "react";
import { toast } from "react-toastify";
import { Button, Menu, Fade } from "@mui/material";
import  DeleteIcon  from "../../assets/icon/delete.svg"; 
import useCategoryStore from "../../store/category-store";
import useBrandStore from "../../store/brand-store";
import StoreSubCategory from "../../store/sub-category";
import StoreBrandCategory from "../../store/brand-category";
import StoreProduct from "../../store/product-store";

export default function FadeMenu({ id, title }: { id: string; title: string }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { deleteBrand } = useBrandStore();
    const { deleteDataCategory } = useCategoryStore();
    const { deleteDataSubCatigory } = StoreSubCategory();
    const { deleteBrandCategory } = StoreBrandCategory();
    const { deleteProduct } = StoreProduct();

    const deleteData = async () => {
        try {
            let status;
            switch (title) {
                case "brand":
                    status = await deleteBrand(id);
                    break;
                case "category":
                    status = await deleteDataCategory(id);
                    break;
                case "subCategory":
                    status = await deleteDataSubCatigory(id);
                    break;
                case "brandCategory":
                    status = await deleteBrandCategory(id);
                    break;
                case "products":
                    status = await deleteProduct(id);
                    break;
                default:
                    throw new Error("Invalid title");
            }

            if (status === 200) {
                handleClose();
                toast.success(`${title} deleted successfully`);
            }
        } catch (err: any) {
            toast.error("Error " + err?.message);
            console.log(err);
        }
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
            >
                <img src={DeleteIcon} alt="Delete" />
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{ marginTop: 1 }}
            >
                <div className='px-4 py-2'>
                    <h3 className=''>Are you sure you want to delete?</h3>
                    <div className='flex items-center justify-end gap-3 mt-2'>
                        <button onClick={handleClose} className='py-1 px-2 rounded-md bg-[#D52200] text-white'>No</button>
                        <button onClick={deleteData} className='py-1 px-2 rounded-md bg-[#D52200] text-white'>Yes</button>
                    </div>
                </div>
            </Menu>
        </div>
    );
}
