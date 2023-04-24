import { Box, Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";
import { MdOutlineWeb } from "react-icons/md";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import IsWide from "../../General/isWide";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tab-panel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Posts() {
  const [posts, setPosts] = React.useState([
    {
      id: 1,
      src: "https://tecmonterreymx.vtexassets.com/arquivos/ids/169851/Playera-deportiva-BORREGOS-silueta-infantil-azul-2.jpg?v=637780420868400000",
    },
    {
      id: 2,
      src: "https://tecmonterreymx.vtexassets.com/arquivos/ids/169851/Playera-deportiva-BORREGOS-silueta-infantil-azul-2.jpg?v=637780420868400000",
    },
  ]);
  const [isYourProfile, setIsYourProfile] = React.useState(true);
  const [valueTab, setValueTab] = React.useState(0);
  const isWide = IsWide();

  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  const gridPosts = (props) => {
    return (
      <div
        style={{
          cursor: "pointer",
        }}
        className="pt-0.5"
        key={props.id}
      >
        <Image
          src={props.src}
          alt="Picture of the author"
          width={400}
          height={400}
          className="m-auto w-full"
        />
      </div>
    );
  };

  const gridSoldPosts = (props) => {
    return (
      <div
        style={{
          cursor: "pointer",
        }}
        className="pt-0.5"
        key={props.id}
      >
        <Image
          src={props.src}
          alt="Picture of the author"
          width={400}
          height={400}
          className="m-auto w-full"
        />
      </div>
    );
  };
  return (
    <div className="mb-20 w-full min-w-full">
      {IsWide ? (
        <></>
      ) : (
        <Divider
          sx={{
            marginTop: 1,
          }}
        />
      )}
      <div>
        <Tabs
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="profile tabs"
          fullWidth
          centered
          sx={
            isYourProfile
              ? { width: "100%" }
              : {
                  width: "100%",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiTabs-indicatorSpan": {
                    maxWidth: 0,
                  },
                }
          }
        >
          <Tab
            label={
              <div className="flex items-center justify-center gap-1">
                <MdOutlineWeb className="text-sm" />
                <Typography
                  variant="body2"
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Publicaciones
                </Typography>
              </div>
            }
            style={
              isYourProfile
                ? { minWidth: "50%" }
                : {
                    minWidth: "100%",
                  }
            }
            disableRipple={isYourProfile ? false : true}
            {...a11yProps(0)}
          />
          {isYourProfile ? (
            <Tab
              label={
                <div className="flex items-center justify-center gap-1">
                  <SellRoundedIcon className="text-sm" />
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Vendido
                  </Typography>
                </div>
              }
              style={{
                minWidth: "50%",
              }}
              {...a11yProps(1)}
            />
          ) : (
            <></>
          )}
        </Tabs>
      </div>
      <TabPanel value={valueTab} index={0}>
        <div className="grid grid-cols-3 gap-0.5">
          {posts.map((post) => gridPosts(post))}
        </div>
      </TabPanel>
      {isYourProfile ? (
        <TabPanel value={valueTab} index={1}>
          <div className="grid grid-cols-3 gap-0.5">
            {posts.map((post) => gridSoldPosts(post))}
          </div>
        </TabPanel>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Posts;
