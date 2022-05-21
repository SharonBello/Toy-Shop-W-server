import React from "react"
import { connect } from 'react-redux'
import { setFilter } from '../store/actions/toy.action.js'
import { Doll } from '../services/svg.service.js'
import MultiSelect from 'react-select'
import ExtensionIcon from '@mui/icons-material/Extension';
import ToysIcon from '@mui/icons-material/Toys';
import CasinoIcon from '@mui/icons-material/Casino';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import BrushIcon from '@mui/icons-material/Brush';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTeddy } from "@fortawesome/react-fontawesome";

const options = [
    { value: 'on wheels', label: 'On wheels' },
    { value: 'box game', label: 'Box game' },
    { value: 'art', label: 'Art' },
    { value: 'baby', label: 'Baby' },
    { value: 'doll', label: 'Doll' },
    { value: 'puzzle', label: 'Puzzle' },
    { value: 'outdoor', label: 'Outdoor' },
]

export class _ToyFilter extends React.Component {

    render() {
        const { onHandleChange, filterBy, onChangePage, labels, handleChangeLabels } = this.props
        return (
            <div className="toy-filter-container">
                <div className="toy-fields-container">
                    <div className="toy-label-filter">
                        <button onClick={() => this.handleChangeLabels('on wheels')} className="filter-onWheel filter-box">
                            <ToysIcon />
                            <p>On Wheels</p>
                        </button>
                        <button onClick={() => this.handleChangeLabels('box game')} className="filter-boxGame filter-box">
                            <CasinoIcon />
                            <p>Board Game</p>
                        </button>
                        <button onClick={() => this.handleChangeLabels('art')} className="filter-art filter-box">
                            <BrushIcon />
                            <p>Art</p>
                        </button>
                        <button onClick={() => this.handleChangeLabels('baby')} className="filter-baby filter-box">
                            <ChildFriendlyIcon />
                            <p>Baby</p>
                        </button>
                        <button onClick={() => this.handleChangeLabels('doll')} className="filter-doll filter-box">
                            <Doll />
                            <p>Doll</p>
                        </button>
                        <button onClick={() => this.handleChangeLabels('puzzle')} className="filter-puzzle filter-box">
                            <ExtensionIcon />
                            <p>Puzzle</p>
                        </button>
                        <button onClick={() => this.handleChangeLabels('outdoor')} className="filter-outdoor filter-box">
                            <SportsSoccerIcon />
                            <p>Outdoor</p>
                        </button>

                        {/* < MultiSelect
                            value={labels}
                            closeMenuOnSelect={false}
                            onChange={handleChangeLabels}
                            isMulti
                            name="labels"
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        /> */}
                        {/* </div> */}

                        <div className="toy-filter-no-labels">

                            <div className="toy-filter-search-container">
                                <input className="search-filter" name="txt" type="search" placeholder="Search..." value={filterBy.txt} onChange={onHandleChange} />
                            </div>

                            <div className="toy-filter-stock-container">

                            <button onClick={() => this.onHandleChange('true')} className="filter-instock filter-box">
                                    <AssignmentTurnedInIcon />
                                    <p>In stock</p>
                                </button>
                                
                            <button onClick={() => this.onHandleChange('true')} className="filter-outofstock filter-box">
                                    <ReportGmailerrorredIcon />
                                    <p>Out of Stock</p>
                                </button>

                                {/* <label htmlFor='in-stock'>In stock:</label>
                                <select className="stock-filter" name='inStock' id='by-stock' onChange={onHandleChange}>
                                    <option value=''>All</option>
                                    <option value='true'>In stock</option>
                                    <option value='false'>Out of stock</option>
                                </select> */}
                            </div>

                            <div className="toy-filter-sort-container">
                                <button onClick={() => this.onHandleChange('name')} className="sortby-name filter-box">
                                    <SortByAlphaIcon />
                                    <p>By Name</p>
                                </button>

                                <button onClick={() => this.onHandleChange('price')} className="sortby-price filter-box">
                                    <AttachMoneyIcon />
                                    <p>By Price</p>
                                </button>

                                <button onClick={() => this.onHandleChange('recent')} className="sortby-date filter-box">
                                    <CalendarTodayIcon />
                                    <p>By Date</p>
                                </button>

                                {/* <label htmlFor='by-sort'>Sort Toys:</label>
                            <select name='sortBy' id='by-sort' onChange={onHandleChange}> */}
                                {/* <option value=''>All</option> */}
                                {/* <option value='name'>Name</option>
                                <option value='price'>Price</option>
                                <option value='recent'>Recently Added</option>
                                </select>
                        </div> */}
                            </div>
                            <div className="pagings">
                                <label htmlFor='by-pageIdx'>Choose Page</label>
                                <button onClick={() => onChangePage(-1)}>-</button>

                                (<h3 style={{ display: 'inline' }}>
                                    -{+(+filterBy.pageIdx + 1)}-
                                </h3>
                                )
                                <button onClick={() => onChangePage(1)}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys,
        filterBy: storeState.toyModule.filterBy
    }
}

const mapDispatchToProps = {
    setFilter,
}

export const ToyFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyFilter)