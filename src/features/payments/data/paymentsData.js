export const revenueStats = [
    {
        id: 1,
        title: 'Total Revenue',
        value: '$124,563',
        change: '+12.5%',
        trend: 'up',
        icon: 'DollarSign',
        bgGradient: 'from-indigo-500 to-purple-600'
    },
    {
        id: 2,
        title: 'Pending Payments',
        value: '$8,420',
        change: '-3.2%',
        trend: 'down',
        icon: 'Clock',
        bgGradient: 'from-orange-500 to-red-600'
    },
    {
        id: 3,
        title: 'Completed',
        value: '1,247',
        change: '+8.1%',
        trend: 'up',
        icon: 'CheckCircle',
        bgGradient: 'from-green-500 to-emerald-600'
    },
    {
        id: 4,
        title: 'Refunds',
        value: '$2,340',
        change: '+1.4%',
        trend: 'up',
        icon: 'RefreshCw',
        bgGradient: 'from-blue-500 to-cyan-600'
    }
];

export const paymentMethods = [
    {
        id: 1,
        name: 'Credit Card',
        icon: 'CreditCard',
        transactions: 856,
        amount: 89420,
        percentage: 72,
        color: 'indigo'
    },
    {
        id: 2,
        name: 'PayPal',
        icon: 'Wallet',
        transactions: 234,
        amount: 24680,
        percentage: 20,
        color: 'blue'
    },
    {
        id: 3,
        name: 'Bank Transfer',
        icon: 'Building2',
        transactions: 67,
        amount: 8123,
        percentage: 6,
        color: 'green'
    },
    {
        id: 4,
        name: 'UPI',
        icon: 'Smartphone',
        transactions: 90,
        amount: 2340,
        percentage: 2,
        color: 'purple'
    }
];

export const transactionsData = [
    {
        id: 'TXN001',
        studentName: 'John Smith',
        email: 'john.smith@example.com',
        course: 'Complete Web Development Bootcamp',
        amount: 1299,
        paymentMethod: 'Credit Card',
        status: 'Completed',
        date: '2024-01-15',
        transactionId: 'pay_abc123xyz'
    },
    {
        id: 'TXN002',
        studentName: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        course: 'Data Science Fundamentals',
        amount: 899,
        paymentMethod: 'PayPal',
        status: 'Completed',
        date: '2024-01-15',
        transactionId: 'pay_def456uvw'
    },
    {
        id: 'TXN003',
        studentName: 'Emily Davis',
        email: 'emily.davis@example.com',
        course: 'UI/UX Design Masterclass',
        amount: 1499,
        paymentMethod: 'Credit Card',
        status: 'Pending',
        date: '2024-01-14',
        transactionId: 'pay_ghi789rst'
    },
    {
        id: 'TXN004',
        studentName: 'Michael Chen',
        email: 'michael.c@example.com',
        course: 'Digital Marketing Pro',
        amount: 799,
        paymentMethod: 'UPI',
        status: 'Completed',
        date: '2024-01-14',
        transactionId: 'pay_jkl012opq'
    },
    {
        id: 'TXN005',
        studentName: 'David Brown',
        email: 'david.b@example.com',
        course: 'Python Programming Advanced',
        amount: 699,
        paymentMethod: 'Bank Transfer',
        status: 'Failed',
        date: '2024-01-13',
        transactionId: 'pay_mno345lmn'
    },
    {
        id: 'TXN006',
        studentName: 'Grace Wilson',
        email: 'grace.w@example.com',
        course: 'Cloud Computing Basics',
        amount: 1599,
        paymentMethod: 'Credit Card',
        status: 'Completed',
        date: '2024-01-13',
        transactionId: 'pay_pqr678ijk'
    },
    {
        id: 'TXN007',
        studentName: 'Alice Johnson',
        email: 'alice.j@example.com',
        course: 'Mobile App Development',
        amount: 1399,
        paymentMethod: 'PayPal',
        status: 'Refunded',
        date: '2024-01-12',
        transactionId: 'pay_stu901ghi'
    },
    {
        id: 'TXN008',
        studentName: 'Bob Smith',
        email: 'bob.smith@example.com',
        course: 'Graphic Design Essentials',
        amount: 599,
        paymentMethod: 'Credit Card',
        status: 'Pending',
        date: '2024-01-12',
        transactionId: 'pay_vwx234def'
    },
    {
        id: 'TXN009',
        studentName: 'Carol Williams',
        email: 'carol.w@example.com',
        course: 'Content Marketing Strategy',
        amount: 499,
        paymentMethod: 'UPI',
        status: 'Completed',
        date: '2024-01-11',
        transactionId: 'pay_yza567abc'
    },
    {
        id: 'TXN010',
        studentName: 'Henry Moore',
        email: 'henry.m@example.com',
        course: 'Cybersecurity Essentials',
        amount: 1799,
        paymentMethod: 'Bank Transfer',
        status: 'Completed',
        date: '2024-01-11',
        transactionId: 'pay_bcd890xyz'
    },
    {
        id: 'TXN011',
        studentName: 'Frank Miller',
        email: 'frank.m@example.com',
        course: 'React Advanced Patterns',
        amount: 999,
        paymentMethod: 'Credit Card',
        status: 'Completed',
        date: '2024-01-10',
        transactionId: 'pay_efg123uvw'
    },
    {
        id: 'TXN012',
        studentName: 'Sophia Martinez',
        email: 'sophia.m@example.com',
        course: 'Brand Identity Design',
        amount: 1299,
        paymentMethod: 'PayPal',
        status: 'Pending',
        date: '2024-01-10',
        transactionId: 'pay_hij456rst'
    }
];
