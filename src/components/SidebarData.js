import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PaymentIcon from '@mui/icons-material/Payment';
import UploadIcon from '@mui/icons-material/Upload';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
    {
        title: "ホーム",
        icon: <HomeIcon />,
        link: "/home",
    },
    {
        title: "メール",
        icon: <EmailIcon />,
        link: "/mail",
    },
    {
        title: "アナリティクス",
        icon: <EqualizerIcon />,
        link: "/analytics",
    },
    {
        title: "友達追加",
        icon: <PersonAddIcon />,
        link: "/friends",
    },
    {
        title: "お支払い設定",
        icon: <PaymentIcon />,
        link: "/payment",
    },
    {
        title: "アップロード",
        icon: <UploadIcon />,
        link: "/upload",
    },
    {
        title: "詳細設定",
        icon: <SettingsIcon />,
        link: "/settings",
    },
]