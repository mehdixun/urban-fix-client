import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error loading users.</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Management: {users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Phone</th>
                            <th className="border border-gray-300 px-4 py-2">Role</th>
                            <th className="border border-gray-300 px-4 py-2">Blocked</th>
                            <th className="border border-gray-300 px-4 py-2">Premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.email}>
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.phone || "-"}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.isBlocked ? "Yes" : "No"}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.isPremium ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;
