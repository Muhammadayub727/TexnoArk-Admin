import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useBrandStore from "../../store/brand-store";
import GlobalTable from "../../components/ui/table";
import ModalBrand from "../../components/modals/brand";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Index() {
    const { getBrand, dataBrands, isLoader } = useBrandStore();
    const [search, setSearch] = useState("");
    const [params, setParams] = useState({ limit: 10, page: 1, search: "" });

    useEffect(() => {
        getBrand(params);
    }, [params]);

    const handleSearchChange = (e:any) => {
        const newSearch = e.target.value || ""; // Ensure newSearch is always a string
        setSearch(newSearch);
        setParams((prevParams) => ({ ...prevParams, search: newSearch }));
    };

    const headers = [
        { title: "S/N", value: "t/r" },
        { title: "Brand", value: "name" },
        { title: "Action", value: "action" }
    ];

    return (
        <>
            <ToastContainer />
            <div className="py-3 flex justify-between items-center">
                <div className="w-96 ">
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        onSubmit={(e) => e.preventDefault()} // Prevent form submission on enter
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Brands"
                            inputProps={{ 'aria-label': 'search brands' }}
                            onChange={handleSearchChange}
                            value={search}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                <ModalBrand title="post" />
            </div>
            <GlobalTable heders={headers} body={dataBrands} skelatonLoader={isLoader} />
        </>
    );
}

export default Index;

