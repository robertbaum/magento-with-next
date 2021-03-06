
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { alpha, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'
import Container from '@material-ui/core/Container';

import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { connect } from 'react-redux';
import { setCartCount } from '../Redux/cart/cart.action';

import MiniCart from '../MiniCart/MiniCart'

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
		color: '#fff',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'flex',
	},
	// sectionMobile: {
	// 	display: 'flex',
	// 	[theme.breakpoints.up('md')]: {
	// 		display: 'none',
	// 	},
	// }

}));

const PrimaryAppBar = (props) => {

	const { cartCount, setCartCount } = props;

	const classes = useStyles();


	const [left, setLeft] = useState(false);

	const toggleLeftDrawer = (toggle) => (e) => {
		if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
			return;
		}
		setLeft(toggle);
	};
	const leftMenu = (
		<div
			className={classes.list}
			role="presentation"
		>
			<LeftMenu onClose={toggleLeftDrawer(false)} />
		</div>
	);

	const [miniCartToggle, setMiniCartToggle] = useState(false);
	const closeMinCart = () => {
		setMiniCartToggle(false)
		console.log('clicked')
	}
	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar>
						<Hidden lgUp>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="open drawer"
								onClick={toggleLeftDrawer(true)}
							>
								<MenuIcon />
							</IconButton>
						</Hidden>
						<Typography className={classes.title} variant="h6" noWrap>
							<div className="logo">
								<Link href="/">logo</Link>
							</div>
						</Typography>
						<Hidden mdDown>
							{leftMenu}
						</Hidden>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search???"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton aria-label={`show ${cartCount} new mails`} color="inherit" onClick={() => { setMiniCartToggle(!miniCartToggle) }}>
								<Badge badgeContent={cartCount} color="secondary" >
									<LocalMallOutlinedIcon />
								</Badge>
							</IconButton>
							<IconButton aria-label="show 17 new notifications" color="inherit">
								<Badge badgeContent={17} color="secondary">
									<FavoriteBorderIcon />
								</Badge>
							</IconButton>

							<RightMenu />
						</div>
					</Toolbar>
				</Container>
			</AppBar>
			<Drawer className={classes.leftDrawer} anchor='left' open={left} onClose={toggleLeftDrawer(false)}>
				{leftMenu}
			</Drawer>
			{
				!miniCartToggle || !cartCount > 0 ? '' : <MiniCart closeMinCart={closeMinCart} />
			}

		</div>
	);
}

const mapStateToProps = state => ({
	cartCount: state.cart.cartCount
})

const mapDispatchToProps = dispatch => ({
	setCartCount: cart => dispatch(setCartCount(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryAppBar)