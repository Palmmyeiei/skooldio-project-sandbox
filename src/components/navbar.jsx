import { AppBar, Toolbar, IconButton, Typography, Stack } from "@mui/material";
import { Search, Favorite, Person, ShoppingBasket } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "#222222", fontFamily: "Poppins, sans-serif" }}
    >
      <Toolbar className="mx-[160px] justify-between">
        <div className="flex items-center gap-[40px]">
          <Typography
            component="div"
            className="text-[18px] font-semibold font-bold"
          >
            WDB
          </Typography>

          <Stack direction="row" spacing={3}>
            <Typography className="hover:text-[#DEF81C] cursor-pointer">
              Men
            </Typography>
            <Typography className="hover:text-[#DEF81C] cursor-pointer">
              Women
            </Typography>
            <Typography className="hover:text-[#DEF81C] cursor-pointer">
              Kids
            </Typography>
            <Typography className="hover:text-[#DEF81C] cursor-pointer">
              Shoes
            </Typography>
            <Typography className="hover:text-[#DEF81C] cursor-pointer">
              Accessories
            </Typography>
          </Stack>
        </div>

        <Stack direction="row" spacing={1}>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <Favorite />
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>
          <IconButton color="inherit">
            <ShoppingBasket />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
