import { Users, UserPlus, BookOpen, CreditCard } from 'lucide-react';

export const statsData = [
    {
        title: 'Total Students',
        value: '320',
        subValue: 'This Month',
        icon: Users,
        color: 'indigo',
        trend: 'up',
        trendValue: '12%'
    },
    {
        title: 'New Registrations',
        value: '45',
        subValue: 'This Month',
        icon: UserPlus,
        color: 'purple',
        trend: 'up',
        trendValue: '8%'
    },
    {
        title: 'Total Courses',
        value: '24',
        subValue: '+3 New Courses',
        icon: BookOpen,
        color: 'emerald',
        trend: 'up',
        trendValue: '3'
    },
    {
        title: 'Pending Payments',
        value: '12',
        subValue: '-62 Payments',
        icon: CreditCard,
        color: 'orange',
        trend: 'down',
        trendValue: '5%'
    }
];

export const chartData = {
    '12months': [
        { period: 'Jan', registrations: 45 },
        { period: 'Feb', registrations: 52 },
        { period: 'Mar', registrations: 48 },
        { period: 'Apr', registrations: 61 },
        { period: 'May', registrations: 55 },
        { period: 'Jun', registrations: 67 },
        { period: 'Jul', registrations: 72 },
        { period: 'Aug', registrations: 68 },
        { period: 'Sep', registrations: 75 },
        { period: 'Oct', registrations: 81 },
        { period: 'Nov', registrations: 78 },
        { period: 'Dec', registrations: 85 }
    ],
    '6months': [
        { period: 'Jul', registrations: 72 },
        { period: 'Aug', registrations: 68 },
        { period: 'Sep', registrations: 75 },
        { period: 'Oct', registrations: 81 },
        { period: 'Nov', registrations: 78 },
        { period: 'Dec', registrations: 85 }
    ],
    '30days': [
        { period: '1', registrations: 12 },
        { period: '5', registrations: 15 },
        { period: '10', registrations: 18 },
        { period: '15', registrations: 22 },
        { period: '20', registrations: 19 },
        { period: '25', registrations: 25 },
        { period: '30', registrations: 28 }
    ],
    '7days': [
        { period: 'Mon', registrations: 8 },
        { period: 'Tue', registrations: 12 },
        { period: 'Wed', registrations: 10 },
        { period: 'Thu', registrations: 15 },
        { period: 'Fri', registrations: 14 },
        { period: 'Sat', registrations: 9 },
        { period: 'Sun', registrations: 7 }
    ]
};

export const recentPayments = [
    {
        id: 1,
        name: 'Sarah Johnson',
        transactionId: 'TXN-2024-001',
        amount: 1299,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: 2,
        name: 'Michael Chen',
        transactionId: 'TXN-2024-002',
        amount: 899,
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: 3,
        name: 'Emily Davis',
        transactionId: 'TXN-2024-003',
        amount: 1499,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: 4,
        name: 'James Wilson',
        transactionId: 'TXN-2024-004',
        amount: 799,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: 5,
        name: 'Sophia Martinez',
        transactionId: 'TXN-2024-005',
        amount: 999,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
];

export const recentRegistrationsData = [
    {
        id: 1,
        studentName: 'Alice Johnson',
        contactNumber: '+1 (555) 123-4567',
        registrationDate: '2024-11-15',
        courseEnrolled: 'Web Development Bootcamp',
        transactionId: 'TXN-2024-001',
        status: 'paid'
    },
    {
        id: 2,
        studentName: 'Bob Smith',
        contactNumber: '+1 (555) 234-5678',
        registrationDate: '2024-11-18',
        courseEnrolled: 'Data Science Fundamentals',
        transactionId: 'TXN-2024-002',
        status: 'pending'
    },
    {
        id: 3,
        studentName: 'Carol Williams',
        contactNumber: '+1 (555) 345-6789',
        registrationDate: '2024-11-20',
        courseEnrolled: 'UI/UX Design Masterclass',
        transactionId: 'TXN-2024-003',
        status: 'paid'
    },
    {
        id: 4,
        studentName: 'David Brown',
        contactNumber: '+1 (555) 456-7890',
        registrationDate: '2024-11-22',
        courseEnrolled: 'Mobile App Development',
        transactionId: 'TXN-2024-004',
        status: 'paid'
    },
    {
        id: 5,
        studentName: 'Emma Davis',
        contactNumber: '+1 (555) 567-8901',
        registrationDate: '2024-11-23',
        courseEnrolled: 'Digital Marketing Pro',
        transactionId: 'TXN-2024-005',
        status: 'pending'
    },
    {
        id: 6,
        studentName: 'Frank Miller',
        contactNumber: '+1 (555) 678-9012',
        registrationDate: '2024-11-24',
        courseEnrolled: 'Python Programming',
        transactionId: 'TXN-2024-006',
        status: 'paid'
    },
    {
        id: 7,
        studentName: 'Grace Wilson',
        contactNumber: '+1 (555) 789-0123',
        registrationDate: '2024-11-25',
        courseEnrolled: 'Cloud Computing Basics',
        transactionId: 'TXN-2024-007',
        status: 'pending'
    },
    {
        id: 8,
        studentName: 'Henry Moore',
        contactNumber: '+1 (555) 890-1234',
        registrationDate: '2024-11-26',
        courseEnrolled: 'Cybersecurity Essentials',
        transactionId: 'TXN-2024-008',
        status: 'paid'
    }
];

