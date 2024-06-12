import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import ModalCategory from "../../components/modals/category";
import GlobalTable from "../../components/ui/table";
import useCategoryStore from "../../store/category-store";

import Paper from "@mui/material/Paper";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";

function Index() {
    const [search, setSearch] = useState("");
    const [dataGet, setDataGet] = useState({ limit: 10, page: 1, search: search });
    const { getDataCategory, dataCategory, isLoader } = useCategoryStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get("search") || "";
        setSearch(searchParam);
        setDataGet((prevDataGet) => ({ ...prevDataGet, search: searchParam }));
    }, [location.search]);

    useEffect(() => {
        getDataCategory(dataGet);
    }, [dataGet]);

    const handleSearchChange = (e:any) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
        const newParams = new URLSearchParams(location.search);
        newParams.set("search", newSearch);
        navigate({ search: newParams.toString() });
    };

    const theader = [
        { title: "S/N", value: "t/r" },
        { title: "Category", value: "name" },
        { title: "Action", value: "action2" }
    ];

    return (
        <>
            <ToastContainer />
            <div className="py-3 flex justify-between items-center">
                <div className="w-96">
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Category"
                            inputProps={{ 'aria-label': 'search products' }}
                            onChange={handleSearchChange}
                            value={search}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                <ModalCategory title="post" />
            </div>
            <GlobalTable heders={theader} body={dataCategory} skelatonLoader={isLoader} />
        </>
    );
}

export default Index;
