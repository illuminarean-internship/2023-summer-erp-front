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
import Link from 'next/link';

const SideMenu = ({ open, selectedLink, handleDrawerOpen }) => {
    const [assetsOpen, setAssetsOpen] = useState(true);

    const assetsHandleClick = () => {
        handleDrawerOpen();
        setAssetsOpen(!assetsOpen);
    };

    const assetsList = [
        { title: 'Accessory', link: 'assets/accessory' },
        { title: 'Books', link: 'assets/books' },
        { title: 'Desktop PC', link: 'assets/desktop-pc' },
        { title: 'Laptop', link: 'assets/laptop' },
        { title: 'Software', link: 'assets/software' },
        { title: 'Test Device', link: 'assets/test-device' },
    ];

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
                                {assetsList.map(({ title, link }) => (
                                    <Link href={`/${link}`} key={title}>
                                        <ListItemButton
                                            sx={{ pl: 4 }}
                                            selected={link === selectedLink}
                                        >
                                            <ListItemIcon>
                                                <FiberManualRecord fontSize="sm" />
                                            </ListItemIcon>
                                            <ListItemText primary={title} />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </ListItem>
                <Link href={'/users'}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
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
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link href={'/settings'}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
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
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </>
    );
};

export default SideMenu;
