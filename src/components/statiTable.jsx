import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





export default function StatiTable({data}) {
  return (
    <TableContainer component={Paper}  sx={{height: 350}}>
      <Table sx={{ minWidth: 650, maxHeight: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Codice</TableCell>
            <TableCell align="right">Descrizione</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.codice}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="right">{row.codice}</TableCell>
              <TableCell align="right">{row.descrizione}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
