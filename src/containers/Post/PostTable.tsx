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
import { Clear, Edit, DeleteOutline, Search, Delete } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams, GridRowsProp } from '@mui/x-data-grid';
import { CustomToolbar } from './CustomToolbar';

type props = {
  updatePostById: Function
  dataSource: IPostItem[]
  isFetching: boolean
}

function PostTable({ dataSource, updatePostById, isFetching }: props) {


  const navigate = useNavigate()
  const { pathname } = useLocation()
  function GotoEditPage(id?: string) {
    navigate({
      pathname: `${pathname}/edit`,
      search: id && `?id=${id}`
    })
  }

  // TODO: consider useMemo to ensure data isn't recreated on every render.
  // TODO: _id -> id from backend
  const rows: GridRowsProp = dataSource.map((post) => ({ ...post, id: post._id }))
  const columns: GridColDef[] = React.useMemo(() => ([
    { field: 'id', headerName: 'id', width: 275, hide: true },
    { field: 'title', headerName: 'Title', width: 175 },
    { field: 'summary', headerName: 'Summary', width: 225 },
    { field: 'tags', headerName: 'Tags', width: 225, 
      renderCell: (params: GridRenderCellParams<IPostItem["tags"]>) => (
        params.value.map((tag) => (
          <Chip key={tag} label={tag} color="primary" />
        )) 
      )
    },
    { field: 'posterUrl', headerName: 'PosterUrl', width: 150,
      renderCell: (params: GridRenderCellParams<IPostItem["posterUrl"]>) => (
        <img style={{ width: "150px" }} alt={params.field} src={params.value}/>
      )
    },
    { field: 'isPublic', headerName: 'isPublic', width: 90,
      renderCell: (params: GridRenderCellParams<IPostItem["isPublic"]>) => (
        <Switch 
          checked={params.value} 
          onChange={(e) => updatePostById({
              // TODO: optimisticResponse field
              variables: { input:{ isPublic: e.target.checked, id: params.id } }
            })
          }/>
      )
    },
    { field: 'like', headerName: 'Like', width: 60 },
    { field: 'pv', headerName: 'PV', width: 60 },
    { field: 'createdAt', headerName: 'CreatedAt', width: 150, 
      valueFormatter: (params: GridValueFormatterParams) => (
        new Date(params.value as string).toLocaleString()
      )
    },
    { field: 'updatedAt', headerName: 'Last Modified Dated', width: 150,
      valueFormatter: (params: GridValueFormatterParams) => (
        new Date(params.value as string).toLocaleString()
      )
    },
    { field: 'action', headerName: 'Action', width: 150, sortable: false, 
      renderCell: (params: GridRenderCellParams<{action: null}>) => (
        <>
          <IconButton size="medium" onClick={() => GotoEditPage(params.id as string)}>
            <Edit/>
          </IconButton>
          <IconButton size="medium">
            <DeleteOutline />
          </IconButton>
        </>
      )
    },
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
          aria-label="search"
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

      <div style={{ height: '90%', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} density='comfortable' rowHeight={80} components={{ Toolbar: () => CustomToolbar(GotoEditPage) }}></DataGrid>
      </div>
    </>
  )
}


export default PostTable;
