/**
 * Handles the loading of all tab like functionality elements
 */
class TabLoader {
  /**
   * @constructor
   */
  constructor() {
    /**
     * Main element holder
     * @type {HTMLElement}
     */
    this._mainTabElement = 
      document.querySelectorAll( TabLoader.CLASS.MAIN_TAB_ELEMENT);
  }

  /**
   * Adding a static with relevant classes to this class
   * @static
   */
  static get CLASS() {
    return {
      MAIN_TAB_ELEMENT: '.tab-element'
    };
  }

  /**
   * Adding a static with error message
   * @static
   */
  static get ERROR() {
    return {
      ERROR_MESSAGE: 'No valid Main Tab elements found. Tab loader failed to iniatilize'
    };
  }

  /**
   * Initializer
   */
  init() {

    // if the node list is empty, fail silently, throw warning
    if( !this._mainTabElement ) {
      console.warn( TabLoader.ERROR.ERROR_MESSAGE );
      return;
    }

    this._loadSingleTabLoader();
  }

  /**
   * We will creat a new instance/reference of the class for each element
   */
  _loadSingleTabLoader() {
    
    for ( let item of this._mainTabElement ) {
      let singleTabLoader = new SingleTabLoader();
      singleTabLoader.init( item );
    }

  }

}

/**
 * Handles the tab loading of a single element
 */
class SingleTabLoader {

  /**
   * @constructor
   */
  constructor() {

    /**
     * holder for main tab element
     * @type {HTMLElement}
     */
    this._mainTabElement;

    /**
     * holder for tab bar element
     * @type {HTMLElement}
     */
    this._tabBar; 

    /**
     * holder for hidden content element
     * @type {HTMLElement}
     */
    this._parentHiddenContent; 

    /**
     * holder for button nodelist
     * @type {NodeList}
     */
    this._tabButtonList;

    /**
     * holder for content nodelist
     * @type {NodeList}
     */
    this._tabContentList;
  }

  /**
   * Adding a static with relevant classes to this class
   * @static
   */
  static get CLASS() {
    return {
      TAB_BAR_ELEMENT: '.tab-button-bar',
      PARENT_HIDEN_CONTENT: '.tab-hidden-content',
      TAB_BUTTON: '.tab-button',
      HIDDEN_CONTENT: '.tab-content'
    };
  }

  /**
   * Adding a static with error message
   * @static
   */
  static get ERROR() {
    return {
      ERROR_MESSAGE: 'Tab class was not initialised correctly.'
    };
  }

  /**
   * Initialiser takes the parent element that this class depends
   * @param {HTMLElement} mainElement 
   */
  init( mainElement ) {

    this._mainTabElement = mainElement;

    if ( !this._mainTabElement ) {
      console.warn( SingleTabLoader.ERROR.ERROR_MESSAGE + 'Main Element not found.' );
      return;
    }

    this._tabBar = 
      this._mainTabElement.querySelector( 
        SingleTabLoader.CLASS.TAB_BAR_ELEMENT 
      );
    

    if ( this._tabBar === null ) {
      console.warn( 
        SingleTabLoader.ERROR.ERROR_MESSAGE + 'Tab bar element not Found.'
      );
      return;
    }

    this._parentHiddenContent = 
      this._mainTabElement.querySelector( 
        SingleTabLoader.CLASS.PARENT_HIDEN_CONTENT 
      );
    
    if ( this._parentHiddenContent === null ) {
      console.warn( 
        SingleTabLoader.ERROR.ERROR_MESSAGE + 
        'Hidden content element not Found.'
      );
      return;
    }

    this._tabButtonList = 
      this._tabBar.querySelectorAll( SingleTabLoader.CLASS.TAB_BUTTON );

    if ( !this._tabButtonList.length ) {
      console.warn( 
        SingleTabLoader.ERROR.ERROR_MESSAGE + ' List of buttons is empty.'
      );
      return;
    }
      
    this._tabContentList = 
      this._parentHiddenContent.querySelectorAll( 
        SingleTabLoader.CLASS.HIDDEN_CONTENT 
      );
    
    if ( !this._tabContentList.length ) {
      console.warn( 
        SingleTabLoader.ERROR.ERROR_MESSAGE + ' List of content is empty.'
      );
      return;
    }

    // extra check to see if the lists are of the same size
    if ( (this._tabButtonList.length !== this._tabContentList.length) ) {
      console.warn( 
        SingleTabLoader.ERROR.ERROR_MESSAGE + 
        'Missing elements in buttons or content list'
      );
      return;
    }

    this._loadTabButton();

  }

  /**
   * initialise TabButton for each button
   */
  _loadTabButton() {

    for ( let i = 0; i < this._tabButtonList.length; i++ ) {

      let tabButton = new TabButton();

      tabButton.init( 
        this._tabButtonList[ i ], 
        this._tabContentList[ i ],
        this._tabContentList,
        this._tabButtonList
      );

    }
  }

}

/**
 * tab button class, handles the functionality on button press
 */
class TabButton {

  /**
   * @constructor
   */
  constructor() {

    /**
     * holder for button
     * @type {HTMLElement}
     */
    this._button;

    /**
     * holder for content
     * @type {HTMLElement}
     */
    this._content;

    /**
     * holder for button list
     * @type {NodeList}
     */
    this._buttonList;

    /**
     * holder for content list
     * @type {NodeList}
     */
    this._contentList;

    this._isActiveHandler;

  }

  /**
   * Adding a static with relevant classes to this class
   * @static
   */
  static get CLASS() {
    return {
      BUTTON_ACTIVE: 'tab-button--active',
      CONTENT_ACTIVE: 'tab-content--active'
    }
  }

  /**
   * Initialiser for TabButton class
   * @param {HTMLElement} button 
   * @param {HTMLElement} content 
   * @param {NodeList} contentList 
   * @param {NodeList} buttonList 
   */
  init( button, content, contentList, buttonList ) {

    this._button = button;
    this._content = content;
    this._buttonList = buttonList;
    this._contentList = contentList;

    this._isActiveHandler = 
      this._isActiveHandler || this._isActive.bind( this );

    this._addEventListener();
  }

  /**
   * Reset function to remove active class from all list elements
   */
  _reset() {

    this._buttonList.forEach( ( item ) => {
      if ( item.classList.contains( TabButton.CLASS.BUTTON_ACTIVE )) {
        item.classList.remove( TabButton.CLASS.BUTTON_ACTIVE );
      }
    });

    this._contentList.forEach( ( item ) => {
      if ( item.classList.contains( TabButton.CLASS.CONTENT_ACTIVE )) {
        item.classList.remove( TabButton.CLASS.CONTENT_ACTIVE );
      }
    });
  }

  /**
   * We add to the referenced elements the active classes
   */
  _isActive() {
    this._reset();
    
    this._button.classList.add( TabButton.CLASS.BUTTON_ACTIVE );
    this._content.classList.add( TabButton.CLASS.CONTENT_ACTIVE );
  }

  _addEventListener() {
    this._button.addEventListener( 'click', this._isActiveHandler );
  }

}

new TabLoader().init();
