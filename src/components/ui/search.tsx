import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



interface PropsDataSerch{
    search:string;
    hendelChange:any;
}

function GlobalSearch({search , hendelChange }:PropsDataSerch) {
    return <>
    
    <div className="w-96">
            <Paper 
            component="form"
            sx={{p:"2px 4px", width:400 , alignItems: "center" , display: "flex"}}>
                <InputBase
                sx={{ml:1 , flex :1}}
                placeholder="Qidiruv"
                value={search}
                onChange={hendelChange}
                inputProps={{"aria-label":"serch google maps"}}/>
                <IconButton type="button" sx={{p: "10px"}} aria-label="search" >
                    <SearchIcon/>
                </IconButton>

            </Paper>
            </div>
    </>
}

export default GlobalSearch