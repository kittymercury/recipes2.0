import React from 'react';

export default class Library extends React.Component {
  renderFolderIcon = (condition) => {
    if (condition) {
      return (
        <div className="icon">
          <i className="far fa-folder"></i>
        </div>
      )
    }
  }

  render() {
    const {
      recipes,
      view,
      order,
      isDeleteMode,
      onClickRecipe
    } = this.props;

    return (
      <div>
        {(isDeleteMode)
          ? (
            <div className={`recipes list ${order}`}>
              {recipes.map((recipe) => {
                return (
                  <div className="item" key={recipe.id} id={recipe.id} onClick={() => onClickRecipe(recipe.id)}>
                    <div className="select">
                      <i className="far fa-circle"></i>
                      <i className="fas fa-circle"></i>
                    </div>
                    <span>{recipe.name}</span>
                  </div>
                )
              })}
            </div>
          )
          : (
            <div className={`recipes ${view} ${order}`}>
              {recipes.map((recipe) => {
                return (
                  <div key={recipe.id} id={recipe.id} className="item" onClick={() => onClickRecipe(recipe.id)}>
                    {this.renderFolderIcon(view === 'gallery')}
                    <div className="name">{recipe.name}</div>
                  </div>
                )
              })}
            </div>
          )
        }
      </div>
    );
  }
};
