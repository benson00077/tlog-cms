import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IPostItem } from './types';
import {
  FormControl,
  Switch,
  Tooltip,
  Chip,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Divider,
  InputBase,
  Pagination,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Clear, Edit, Search } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { CustomToolbar } from './CustomToolbar';

type props = {
  updatePostById: Function
  dataSource: IPostItem[]
  isFetching: boolean
}

function PostTable({ dataSource, updatePostById, isFetching }: props) {


  const navigate = useNavigate()
  const { pathname } = useLocation()
  function GotoEditPage() {
    navigate(`${pathname}/edit`)
  }

  // TODO: consider useMemo to ensure data isn't recreated on every render.
  // TODO: _id -> id from backend
  const rows: GridRowsProp = dataSource.map((post) => ({ ...post, id: post._id }))
  const columns: GridColDef[] = React.useMemo(() => ([
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'summary', headerName: 'Summary', width: 150 },
    { field: 'tags', headerName: 'Tags', width: 150 },
    { field: 'posterUrl', headerName: 'PosterUrl', width: 150 },
    { field: 'isPublic', headerName: 'isPublic', width: 90 },
    { field: 'like', headerName: 'Like', width: 60 },
    { field: 'pv', headerName: 'PV', width: 60 },
    { field: 'createdAt', headerName: 'CreatedAt', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modified Dated', width: 150 },
    { field: 'action', headerName: 'Action', width: 150 },
  ]), [])

  return (
    <>
      <Paper sx={{
        position: 'absolute',
        right: '24px',
        top: '83px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        zIndex: 1101,
      }}>
        <InputBase
          placeholder="Search Posts by Title"
          inputProps={{ 'aria-label': 'search post by title' }}
          onChange={() => { }} //TODO
        />
        <IconButton
          color="primary"
          aria-label="clear"
          onClick={() => { }} //TODO
        >
          <Search />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton
          color="primary"
          aria-label="clear"
          onClick={() => { }} //TODO
        >
          <Clear />
        </IconButton>
      </Paper>

      <div style={{ height: '80%', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: () => CustomToolbar(GotoEditPage) }}></DataGrid>
      </div>
    </>
  )
}


export default PostTable;
