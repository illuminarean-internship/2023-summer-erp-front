import {
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useState } from 'react';
import {
    ExpandLess,
    ExpandMore,
    FiberManualRecord,
    Interests,
    Person,
    SettingsOutlined,
} from '@mui/icons-material';

const SideMenu = ({ open }) => {
    const [assetsOpen, setAssetsOpen] = useState(true);
    const [userOpen, setUserOpen] = useState(false);
    const [settingOpen, setSettingOpen] = useState(false);

    const assetsHandleClick = () => {
        setAssetsOpen(!assetsOpen);
        setUserOpen(false);
        setSettingOpen(false);
    };

    const userHandleClick = () => {
        setAssetsOpen(false);
        setUserOpen(!userOpen);
        setSettingOpen(false);
    };

    const settingHandleClick = () => {
        setAssetsOpen(false);
        setUserOpen(false);
        setSettingOpen(!settingOpen);
    };

    return (
        <>
            <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={assetsHandleClick}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Interests />
                        </ListItemIcon>
                        <ListItemText
                            primary="Assets"
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                        {open && (assetsOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    {open && (
                        <Collapse in={assetsOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {[
                                    'Accessory',
                                    'Books',
                                    'Desktop PC',
                                    'Hardware',
                                    'Software',
                                    'Test Device',
                                ].map((text) => (
                                    <ListItemButton sx={{ pl: 4 }} key={text}>
                                        <ListItemIcon>
                                            <FiberManualRecord fontSize="sm" />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={userHandleClick}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Person />
                        </ListItemIcon>
                        <ListItemText
                            primary="Users"
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                        {open && (userOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    {open && (
                        <Collapse in={userOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {[
                                    'Operation Team',
                                    'Development Team',
                                    'Product Team',
                                    'Design Team',
                                    'Software',
                                    'QA Team',
                                ].map((text) => (
                                    <ListItemButton sx={{ pl: 4 }} key={text}>
                                        <ListItemIcon>
                                            <FiberManualRecord fontSize="sm" />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={settingHandleClick}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <SettingsOutlined />
                        </ListItemIcon>
                        <ListItemText
                            primary="Settings"
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                        {open &&
                            (settingOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    {open && (
                        <Collapse in={settingOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {['Settings'].map((text) => (
                                    <ListItemButton sx={{ pl: 4 }} key={text}>
                                        <ListItemIcon>
                                            <FiberManualRecord fontSize="sm" />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </ListItem>
            </List>
        </>
    );
};

export default SideMenu;
