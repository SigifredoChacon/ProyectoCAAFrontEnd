import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';

import { useAppSelector, useAppDispatch } from "../hooks/store"; // Importa hooks personalizados
import { useEffect } from 'react';
import { fetchUsers } from '../store/users/slice';

export default function ListOfUsers() {
    const dispatch = useAppDispatch();  // Usa el hook personalizado con tipado

    // Obtén los datos específicos del estado de users
    const { users, loading, error } = useAppSelector((state) => state.users);

    // Despacha la acción para obtener los usuarios cuando el componente se monte
    useEffect(() => {
        console.log('Despachando fetchUsers...');
        dispatch(fetchUsers());  // Llama a la acción fetchUsers para obtener los datos de la API
    }, [dispatch]);

    console.log('Estado actual - Users:', users);  // Verifica el estado de usuarios
    console.log('Estado actual - Loading:', loading);  // Verifica el estado de carga
    console.log('Estado actual - Error:', error);  // Verifica el estado de error

    return (
        <>
            <button
                type="button"
                className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
            >
                Add workspace
            </button>

            {/* Manejo de carga y error */}
            {loading && <p>Cargando usuarios...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && users.length > 0 && (
                <Table className="mt-8">
                    <TableHead>
                        <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                            <TableHeaderCell>Cedula/Carnet</TableHeaderCell>
                            <TableHeaderCell>Nombre</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Correo Institucional</TableHeaderCell>
                            <TableHeaderCell>Telefono</TableHeaderCell>
                            <TableHeaderCell>Telefono2</TableHeaderCell>
                            <TableHeaderCell>Direccion</TableHeaderCell>
                            <TableHeaderCell>Rol</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.CedulaCarnet || index}> {/* Usa CedulaCarnet o el índice como clave */}
                                <TableCell>{user.CedulaCarnet ?? 'N/A'}</TableCell>
                                <TableCell>{user.Nombre ?? 'N/A'}</TableCell>
                                <TableCell>{user.CorreoEmail ?? 'N/A'}</TableCell>
                                <TableCell>{user.CorreoInstitucional ?? 'N/A'}</TableCell>
                                <TableCell>{user.Telefono ?? 'N/A'}</TableCell>
                                <TableCell>{user.Telefono2 ?? 'N/A'}</TableCell>
                                <TableCell>{user.Direccion ?? 'N/A'}</TableCell>
                                <TableCell>{user.idRol ?? 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {!loading && !error && users.length === 0 && <p>No hay usuarios disponibles.</p>}
        </>
    );
}
