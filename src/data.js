import Image from "next/image"
import HomeIcon from "./components/HomeIcon"

const Calendar = () => {
    return (
        <Image 
        src={"/calendar.png"}
        width={25}
        height={25}
        />
    )
}

const Reports = () => {
    return (
        <Image 
        src={"/report.png"}
        width={25}
        height={25}
        />
    )
}

const Reminders = () => {
    return (
        <Image 
        src={"/remindersWhite.png"}
        width={25}
        height={25}
        />
    )
}

const Star = () => {
    return (
        <Image 
        src={"/star.png"}
        width={25}
        height={25}
        />
    )
}

const History = () => {
    return (
        <Image 
        src={"/history.png"}
        width={25}
        height={25}
        />
    )
}

const data = {
    sideBar : [{
        name : "Home",
        icon : <HomeIcon />,
    },{
        name : "Time Sheets",
        icon : <History />,
    },{
        name : "Upcoming Events",
        icon : <Star />,
    },{
        name : "Reports",
        icon : <Reports />,
    },{
        name : "Notices",
        icon : <Reminders />,
    },{
        name : "Schedule",
        icon : <Calendar />,
    },
],
    notices : [{
        subject : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        type : "Notice",
        startDate : "Wed Sep 12, 2023",
        startTime : "8:00 pm",
        endDate : "Wed Sep 14, 2023",
        endTime : "8:00 pm"
    },{
        subject : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        type : "Notice",
        startDate : "Wed Sep 12, 2023",
        startTime : "8:00 pm",
        endDate : "Wed Sep 14, 2023",
        endTime : "8:00 pm"
    },{
        subject : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        type : "Notice",
        startDate : "Wed Sep 12, 2023",
        startTime : "8:00 pm",
        endDate : "Wed Sep 14, 2023",
        endTime : "8:00 pm"
    },{
        subject : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        type : "Notice",
        startDate : "Wed Sep 12, 2023",
        startTime : "8:00 pm",
        endDate : "Wed Sep 14, 2023",
        endTime : "8:00 pm"
    },{
        subject : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        type : "Notice",
        startDate : "Wed Sep 12, 2023",
        startTime : "8:00 pm",
        endDate : "Wed Sep 14, 2023",
        endTime : "8:00 pm"
    },{
        subject : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        type : "Notice",
        startDate : "Wed Sep 12, 2023",
        startTime : "8:00 pm",
        endDate : "Wed Sep 14, 2023",
        endTime : "8:00 pm"
    },{
        subject : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
        type : "Notice",
        startDate : "Wed Sep 12, 2023",
        startTime : "8:00 pm",
        endDate : "Wed Sep 14, 2023",
        endTime : "8:00 pm"
    },
    ]

}

export default data