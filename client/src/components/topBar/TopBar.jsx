import "./topBar.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import { useState } from "react";
import useLogout from "../../hooks/useLogout";

const TopBar = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const logout = useLogout();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="topBarContainer">
            <div className="left">
                <div className="title">
                    <h2>LINE</h2>
                    <div className="dropDown">

                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <ArrowDropDownIcon sx={{
                                color: "var(--main-color)",
                                "&:hover": {
                                    color: "var(--main-color-light)"
                                }
                            }}
                            />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                            <MenuItem onClick={handleClose}>quit</MenuItem>
                        </Menu>
                    </div>

                </div>
                <div className="function">

                    <SmsOutlinedIcon sx={{
                        fontSize: 28,
                        color: "var(--main-color)",
                        "&:hover": {
                            color: "var(--main-color-light)"
                        }
                    }} />


                </div>
            </div>
            <div className="right">
            </div>
        </div>
    )
}

export default TopBar