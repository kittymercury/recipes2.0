import React from 'react';

import Library from './components/library';
import Recipe from './components/recipe';
import PopUp from './components/popup';
import Sidebar from './components/sidebar';
import InputSearch from './components/inputSearch';

// TODO:
// 7. smooth appear of sidebar
// 15. fix rendering order while gallery view
// 16. make 1 handler for all appearance changes

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeId: null,
      recipes: [
        { id: 1,
          name: 'Lasagne',
          ingredients: ['beef 500g', 'cheese 200g', 'bolognese 450g', 'lasagne leaves', 'for bechamel:', 'milk', 'butter', 'muscat nut' ],
          procedure: [ 'de do de do daaaaaaaa', 'bolognese sauce! i love this sauce sooo much. it is hard to find good bolognese sauce in local stores.. but today i\'ve done it! and now it is waiting for it\'s time to become a part of the masterpiece of art <3' ],
        },
        { id: 2,
          name: 'Tuna salad',
          ingredients: ['tuna in oil', 'tomatoes', 'letucce'],
          procedure: ['eat', 'smile', 'relax'],
        },
        { id: 3,
          name: 'Peanut butter',
          ingredients: ['peanuts', 'honey', 'salt'],
          procedure: ['roast', 'grind', 'mix'],
        },
        { id: 4,
          name: 'Walnut butter',
          ingredients: ['walnuts', 'honey', 'salt'],
          procedure: ['roast', 'grind', 'mix'],
        },
        { id: 5,
          name: 'Almond butter',
          ingredients: ['almonds', 'honey', 'salt'],
          procedure: ['roast', 'grind', 'mix'],
        },
        { id: 6,
          name: 'Hazelnut butter',
          ingredients: ['hazelnuts', 'honey', 'salt'],
          procedure: ['roast', 'grind', 'mix'],
        },
        { id: 7,
          name: 'Cashew butter',
          ingredients: ['cashews', 'honey', 'salt'],
          procedure: ['roast', 'grind', 'mix'],
        },
        { id: 8,
          name: 'Pistachio butter',
          ingredients: ['pistachios', 'honey', 'salt'],
          procedure: ['roast', 'grind', 'mix'],
        },
      ],
      value: '',
      popUp: null,
      selectedRecipes: [],
      inputSearch: '',

      isEditMode: false,
      isSidebarActive: false,
      isDeleteMode: false,
      isSearch: false,

      view: 'list',
      order: 'new-first'
    }
  }

  handleChangeInputSearch = (e) => {
    this.setState({ inputSearch: e.target.value });
  }

  // control
  handleClickBack = () => {
    this.setState({ recipeId: null, isEditMode: false });
  }

  // popup
  handleOpenPopUp = (popUp) => {
    this.setState({ popUp, isSidebarActive: false })
  }

  handleClickItem = (id) => {
    const { isDeleteMode, recipes, selectedRecipes } = this.state;

    if (!isDeleteMode) {
      this.setState({ recipeId: id });
    }

    if (isDeleteMode) {
      const rcp = recipes.find((r) => r.id === id);
      const $recipe = document.getElementById(`${id}`);
      console.log({id: id, recipe: $recipe});
      const isSelected = selectedRecipes.includes(id);

      if (isSelected) {
        $recipe.classList.toggle('selected');
        const filteredSelectedRecipes = selectedRecipes.filter((id) => id !== rcp.id);
        this.setState({ selectedRecipes: filteredSelectedRecipes })
      }

      if (!isSelected) {
        $recipe.classList.toggle('selected');
        this.setState({ selectedRecipes: selectedRecipes.concat(rcp.id) })
      }
    }
  }

  handleClickDeleteSelectedItems = () => {
    const { recipes, selectedRecipes  } = this.state;
    console.log(selectedRecipes);
    for (let i = 0; i < selectedRecipes.length; i++) {
      newRecipes = recipes.filter((r) => r.id !== selectedRecipes[i]);
    }
    this.setState({
      recipes: newRecipes,
      selectedRecipes: [],
      isDeleteMode: false
    })
  }

  handleClickAdd = () => {
    const { value, recipes } = this.state;

    if (value && value.trim()) {
      const newRecipe = {
        id: +new Date(),
        name: value,
        ingredients: [],
        procedure: []
      }
      const newRecipes = recipes.concat(newRecipe);

      return this.setState({
        recipes: newRecipes,
        popUp: null,
        value: '',
        recipeId: newRecipe.id
      })
    }
  }

  handleChangeValue = (e) => {
    this.setState({ value: e.target.value })
  }

  handleClickCancelAdding = () => {
    this.setState({ popUp: null, value: '' })
  }

  handlePressKey = (e) => {
    if (e.keyCode === 13) {
      this.handleClickAdd();
    }
    if (e.keyCode === 27) {
      this.handleClickCancel();
    }
  }


  // sidebar
  handleClickOpenSidebar = () => {
    this.setState({ isSidebarActive: true })
  }

  handleClickCloseSidebar = () => {
    this.setState({ isSidebarActive: false })
  }

  // -------------------------

  handleClickChangeView = (activeView) => {
    this.setState({ view: activeView })
  }

  handleClickChangeOrder = (activeOrder) => {
    this.setState({ order: activeOrder })
  }

  // --------------------------------

  handleClickDelete = () => {
    this.setState({ isDeleteMode: true, isSidebarActive: false, selectedRecipes: [] })
  }

  // delete-menu
  handleClickCancelDeleting = () => {
    this.setState({ isDeleteMode: false, selectedRecipes: [] })
  }
// render content

  renderLibraryHeader = (condition) => {
    if (condition) {
      return (
        <div className="delete-menu">
          <button className="delete" onClick={() => this.handleClickDeleteSelectedItems()}>Delete</button>
            <div className="select-all">Delete all</div>
          <button className="cancel" onClick={this.handleClickCancelDeleting}>Cancel</button>
        </div>
      )
    } else {
      return (
        <div className="header">
          <i className="fas fa-bars" onClick={this.handleClickOpenSidebar}></i>
          <span>Library</span>
          <i className="fas fa-search" onClick={() => this.setState({ isSearch: true })}></i>
        </div>
      )
    }
  }

  renderPage = (condition) => {
    if (condition) {
      const { recipeId, recipes, isEditMode } = this.state;

      return (
        <Recipe
          clickBack={this.handleClickBack}
          recipes={recipes}
          recipeId={recipeId}
          isEditMode={isEditMode}
        />
      )
    } else {
      const { recipes, isDeleteMode, isSearch, inputSearch, view, order, selectedRecipes } = this.state;

      let foundRecipes = [];
      if (isSearch && inputSearch) {
        recipes.forEach((rec) => {
          if (rec.name.toLowerCase().includes(inputSearch.toLowerCase())) {
            foundRecipes.push(rec);
          }
        });
      } else {
        foundRecipes = recipes;
      }

      return (
        <div className="library">
          {isSearch
            ? <InputSearch
              onChange={this.handleChangeInputSearch}
              onCancel={() => this.setState({ isSearch: false, inputSearch: '' })}
              value={inputSearch}
            />
            : this.renderLibraryHeader(isDeleteMode)}
          <Library
            recipes={foundRecipes}
            view={view}
            order={order}
            selectedRecipes={selectedRecipes}
            onClickRecipe={this.handleClickItem}
            isDeleteMode={isDeleteMode}
          />
        </div>
      )
    }
  }

  render() {
    const {
      recipeId,
      popUp,
      value,
      isSidebarActive,
      fontSize,
      view,
      order
    } = this.state;

    return (
      <div className={`app ${fontSize}`}>
        {popUp && (
            <PopUp
              value={value}
              onAdd={this.handleClickAdd}
              onCancel={this.handleClickCancelAdding}
              onChange={this.handleChangeValue}
              onKeyUp={this.handlePressKey}
            />
          )}
        {isSidebarActive && (
          <Sidebar
            view={view}
            order={order}
            fontSize={fontSize}
            isSidebarActive={isSidebarActive}
            onOpenPopUp={this.handleOpenPopUp}
            onCloseSidebar={this.handleClickCloseSidebar}
            onClickDelete={this.handleClickDelete}
            onClickChangeView={this.handleClickChangeView}
            onClickChangeOrder={this.handleClickChangeOrder}
            onClickChangeFontSize={this.handleClickChangeFontSize}
          />
        )}
        {this.renderPage(recipeId)}
      </div>
    );
  }
};
