'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';

interface Room {
    idSala: number;
    workspace: string;
    owner: string;
    status: string;
    region: string;
    capacity: string;
    costs: string;
    lastEdited: string;
}

export default function Example() {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        // Llama a la API para obtener los datos de los rooms
        axios.get('http://localhost:3000/rooms/getAll')
            .then(response => setRooms(response.data))
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    return (
        <>
            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
                <div>
                    <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Workspaces
                    </h3>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        Overview of all registered workspaces within your organization.
                    </p>
                </div>
                <button
                    type="button"
                    className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
                >
                    Add workspace
                </button>
            </div>
            <Table className="mt-8">
                <TableHead>
                    <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            idSala
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Nombre
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Status
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Region
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Capacity
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Costs
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Last edited
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms.map((item) => (
                        <TableRow key={item.idSala}>
                            <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                {item.workspace}
                            </TableCell>
                            <TableCell>{item.idSala}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.region}</TableCell>
                            <TableCell>{item.capacity}</TableCell>
                            <TableCell className="text-right">{item.costs}</TableCell>
                            <TableCell className="text-right">{item.lastEdited}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
