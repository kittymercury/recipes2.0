import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      ingredients: '',
      procedure: '',
      isEditMode: this.props.isEditMode
    }
  }

  handleChange = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  clickDone = () => {
    const { recipes, recipeId } = this.props;
    const { title, ingredients, procedure, isEditMode } = this.state;
    const currentRecipe = recipes.find((recipe) => recipe.id === recipeId);
    const updatedRecipe = {
      id: currentRecipe.id,
      name: title,
      ingredients: ingredients.split('\n'),
      procedure: procedure.split('\n')
    }
    const indexOfRecipe = recipes.indexOf(currentRecipe);
    recipes.splice(indexOfRecipe, 1, updatedRecipe);

    this.setState({ isEditMode: false, recipes: recipes });
  }

  clickEdit = () => {
    const { recipes, recipeId } = this.props;
    const recipe = recipes.find((r) => r.id === recipeId);
    let textIngredients = recipe.ingredients.join('\n');
    let textProcedure = recipe.procedure.join('\n');

    this.setState({
      isEditMode: true,
      ingredients: textIngredients,
      procedure: textProcedure,
      title: recipe.name
    });
  }

  renderControl = (condition) => {
    return (
      <div className="control">
        <div className="back" onClick={this.props.clickBack}>
          <i className="fas fa-chevron-left"></i>
        </div>
        {this.renderButtonEdit(condition)}
      </div>
    )
  }

  renderButtonEdit = (condition) => {
    if (condition) {
      return (
        <div className="done" onClick={this.clickDone}>
          <i className="fas fa-check"></i>
        </div>
      )
    } else {
      return (
        <div className="edit" onClick={this.clickEdit}>
          <i className="fas fa-pen"></i>
        </div>
      )
    }
  }

  renderTitle = (condition) => {
    const { recipes, recipeId } = this.props;
    const recipe = recipes.find((r) => r.id === recipeId);

    if (condition) {
      return (
        <div className="title">
          <TextareaAutosize
            defaultValue={recipe.name}
            autoFocus
            id="title"
            name="title"
            onChange={(e) => this.handleChange('title', e)}
          />
        </div>
      )
    } else {
      return <div className="title">{recipe.name}</div>
    }
  }

  renderContent = (condition) => {
    const { recipes, recipeId } = this.props;
    const { ingredients, procedure } = this.state;
    const recipe = recipes.find((r) => r.id === recipeId);
    let contentIngredients = recipe.ingredients.map((ingredientItem) => {
      return <div id="item" key={`i-${recipe.ingredients.indexOf(ingredientItem)}`}>{ingredientItem}</div>
    });
    let contentProcedure = recipe.procedure.map((procedureItem) => {
      return <div id="item" key={`p-${recipe.procedure.indexOf(procedureItem)}`}>{procedureItem}</div>
    });

    if (condition) {
      return (
        <div className="dynamic">
          <label htmlFor="ingredients">Ingredients</label>
          <TextareaAutosize
            defaultValue={recipe.ingredients.join('\n')}
            id="ingredients"
            name="ingredients"
            onChange={(e) => this.handleChange('ingredients', e)}
          />
          <label htmlFor="procedure">Instruction</label>
          <TextareaAutosize
            defaultValue={recipe.procedure.join('\n')}
            id="procedure"
            name="procedure"
            onChange={(e) => this.handleChange('procedure', e)}
          />
        </div>
      )
    } else {
      return (
        <div className="static">
          <div className="ingredients">
            <div className="area-name">Ingredients</div>
            <div className="container">{contentIngredients}</div>
          </div>
          <div className="procedure">
            <div className="area-name">Instruction</div>
            <div className="container">{contentProcedure}</div>
          </div>
        </div>
      )
    }
  }

  render() {
    const { isEditMode } = this.state;

    return (
      <div className="recipe">
        {this.renderControl(isEditMode)}
        <div className="content">
          {this.renderTitle(isEditMode)}
          {this.renderContent(isEditMode)}
        </div>
      </div>
    );
  }
};
