import React from 'react';
import { FormControl, InputLabel, Paper, Select, MenuItem, TextField, Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { options } from '../consts/consts'

const useStyles = makeStyles((theme) =>
    createStyles({
        formControl: {
            minWidth: 200,
            margin: '1rem',
        },
        paper: {
            minWidth: 1050,
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        btn: {
            backgroundColor: theme.palette.primary,
            color: theme.palette.secondary,
        },
        btn_checked: {
            backgroundColor: theme.palette.secondary,
            color: theme.palette.primary,
        }
    }),
);

export default function Filter(props) {
    const classes = useStyles();
    const [s1, sets1] = React.useState('');
    const [s2, sets2] = React.useState('');
    const [s3, sets3] = React.useState('');
    const [checked, setChecked] = React.useState(false);

    let menuItens = [];

    options.forEach((option) => {
        menuItens.push(<MenuItem value={option}>{option}</MenuItem>)
    })

    function handleClick() {
        props.sendValues({
            id: props.id,
            selection: s1,
            comparator: s2,
            constraint: s3
        })
        setChecked(true);
    }

    return (
        <Paper elevation={5} className={classes.paper}>
            <FormControl className={classes.formControl}>
                <InputLabel>Campos</InputLabel>
                <Select
                    value={s1}
                    onChange={(e) => {
                        sets1(e.target.value)
                    }}
                >
                    {menuItens}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel >Comparações</InputLabel>
                <Select
                    value={s2}
                    onChange={(e) => {
                        sets2(e.target.value)
                    }}
                >
                    <MenuItem value={'<'}>Menor que</MenuItem>
                    <MenuItem value={'>'}>Maior que</MenuItem>
                    <MenuItem value={'<='}>Menor/igual que</MenuItem>
                    <MenuItem value={'>='}>Maior/igual que</MenuItem>
                    <MenuItem value={'='}>Igual a</MenuItem>
                    <MenuItem value={'!='}>Diferente de</MenuItem>
                    <MenuItem value={'like'}>Semelhante a</MenuItem>

                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <TextField
                    label="Valor"
                    onChange={(e) => {
                        sets3(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl className={classes.formControl}>
                <Button
                    variant="contained"
                    color={checked ? 'primary' : 'secondary'}
                    onClick={handleClick}
                >
                    Confirmar Filtro
                </Button>
            </FormControl>

        </Paper>
    )
}