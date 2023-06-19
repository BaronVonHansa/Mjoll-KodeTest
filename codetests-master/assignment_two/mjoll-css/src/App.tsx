import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  filterRow: {
    padding: theme.spacing(2),
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  },
  gray: {
    backgroundColor: theme.palette.grey[200],
  },
  navyBlue: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  hover: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

interface Filter {
  label: string;
  enabled: boolean;
}

const FilterApp: React.FC = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState<Filter[]>([
    { label: 'Filter 1', enabled: false },
    { label: 'Filter 2', enabled: false },
    { label: 'Filter 3', enabled: false },
    { label: 'Filter 4', enabled: false },
  ]);

  const toggleFilter = (index: number) => {
    setFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];
      updatedFilters[index].enabled = !updatedFilters[index].enabled;
      return updatedFilters;
    });
  };

  return (
    <Grid container direction="column" alignItems="center">
      {filters.map((filter, index) => (
        <Grid
          key={index}
          item
          container
          alignItems="center"
          justify="space-between"
          className={`${classes.filterRow} ${
            index % 2 === 0 ? classes.gray : classes.navyBlue
          } ${classes.hover}`}
        >
          <Typography>{filter.label}</Typography>
          <Switch
            checked={filter.enabled}
            onChange={() => toggleFilter(index)}
            color="primary"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FilterApp;
