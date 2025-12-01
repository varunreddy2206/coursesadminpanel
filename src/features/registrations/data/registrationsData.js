export const registrationsData = [
    {
        id: 'REG001',
        student: {
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1 234-567-8901',
            avatar: 'https://i.pravatar.cc/150?img=1',
            location: 'New York, USA'
        },
        course: {
            id: 'C001',
            title: 'Complete Web Development Bootcamp',
            category: 'Web Development',
            price: 1299,
            duration: '12 weeks'
        },
        registrationDate: '2024-01-15',
        status: 'pending',
        paymentStatus: 'pending',
        amount: 1299,
        notes: 'Interested in frontend specialization'
    },
    {
        id: 'REG002',
        student: {
            name: 'Michael Chen',
            email: 'michael.c@email.com',
            phone: '+1 234-567-8902',
            avatar: 'https://i.pravatar.cc/150?img=12',
            location: 'San Francisco, USA'
        },
        course: {
            id: 'C002',
            title: 'Data Science Fundamentals',
            category: 'Data Science',
            price: 899,
            duration: '10 weeks'
        },
        registrationDate: '2024-01-14',
        status: 'approved',
        paymentStatus: 'paid',
        amount: 899,
        notes: 'Payment completed via credit card'
    },
    {
        id: 'REG003',
        student: {
            name: 'Emily Davis',
            email: 'emily.d@email.com',
            phone: '+1 234-567-8903',
            avatar: 'https://i.pravatar.cc/150?img=5',
            location: 'Los Angeles, USA'
        },
        course: {
            id: 'C003',
            title: 'UI/UX Design Masterclass',
            category: 'UI/UX',
            price: 1499,
            duration: '8 weeks'
        },
        registrationDate: '2024-01-13',
        status: 'pending',
        paymentStatus: 'pending',
        amount: 1499,
        notes: 'Requested installment payment plan'
    },
    {
        id: 'REG004',
        student: {
            name: 'David Brown',
            email: 'david.b@email.com',
            phone: '+1 234-567-8904',
            avatar: 'https://i.pravatar.cc/150?img=13',
            location: 'Chicago, USA'
        },
        course: {
            id: 'C004',
            title: 'Digital Marketing Pro',
            category: 'Marketing',
            price: 799,
            duration: '6 weeks'
        },
        registrationDate: '2024-01-12',
        status: 'approved',
        paymentStatus: 'paid',
        amount: 799,
        notes: 'Corporate training enrollment'
    },
    {
        id: 'REG005',
        student: {
            name: 'Jessica Wilson',
            email: 'jessica.w@email.com',
            phone: '+1 234-567-8905',
            avatar: 'https://i.pravatar.cc/150?img=9',
            location: 'Boston, USA'
        },
        course: {
            id: 'C005',
            title: 'Python Programming Advanced',
            category: 'Web Development',
            price: 699,
            duration: '14 weeks'
        },
        registrationDate: '2024-01-11',
        status: 'rejected',
        paymentStatus: 'failed',
        amount: 699,
        notes: 'Payment failed - insufficient funds'
    },
    {
        id: 'REG006',
        student: {
            name: 'Robert Taylor',
            email: 'robert.t@email.com',
            phone: '+1 234-567-8906',
            avatar: 'https://i.pravatar.cc/150?img=14',
            location: 'Seattle, USA'
        },
        course: {
            id: 'C006',
            title: 'Cloud Computing Basics',
            category: 'Data Science',
            price: 1599,
            duration: '9 weeks'
        },
        registrationDate: '2024-01-10',
        status: 'pending',
        paymentStatus: 'pending',
        amount: 1599,
        notes: 'Waiting for company approval'
    }
];

export const registrationStats = [
    {
        id: 1,
        label: 'Total Registrations',
        value: 156,
        change: '+12%',
        trend: 'up',
        icon: 'Users',
        color: 'orange'
    },
    {
        id: 2,
        label: 'Pending Approval',
        value: 23,
        change: '+5',
        trend: 'up',
        icon: 'Clock',
        color: 'yellow'
    },
    {
        id: 3,
        label: 'Approved',
        value: 118,
        change: '+8%',
        trend: 'up',
        icon: 'CheckCircle',
        color: 'green'
    },
    {
        id: 4,
        label: 'Rejected',
        value: 15,
        change: '-2',
        trend: 'down',
        icon: 'XCircle',
        color: 'red'
    }
];
