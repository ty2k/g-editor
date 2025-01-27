import React from 'react';
import types from '../data/types';
import { changeType } from '../globals/fake-data';

import { Dropdown } from '../components/Dropdown';
import { RecursiveTreeView } from '../components/TreeView';

import './editor.scss';

const { data, editPost, domReady } = window.wp;


class Editor extends React.Component {
  constructor (props) {
    super(props);

    let type = window.location.pathname.replace(/\//g, '');
    type = type.slice(0, -1);

    this.state = {
      postType: type || 'page',
    };
  }

  componentDidMount () {
    const { postType } = this.state;

    const settings = {
      alignWide: true,
      availableTemplates: [],
      allowedBlockTypes: true,
      disableCustomColors: false,
      disableCustomFontSizes: false,
      disablePostFormats: false,
      titlePlaceholder: 'Add title',
      bodyPlaceholder: 'Insert your custom block',
      isRTL: false,
      autosaveInterval: 3,
      style: [],
      imageSizes: [],
      richEditingEnabled: true,
      postLock: {
        isLocked: false,
      },
      postLockUtils: {
        nonce: '123456789',
      },
      enableCustomFields: true,
      mediaLibrary: true,
      __experimentalBlockPatterns: [],
      __experimentalBlockPatternCategories: [],
      __experimentalDisableCustomLineHeight: [],
      __experimentalDisableCustomUnits: [],
      __experimentalEnableLinkColor: [],
    };

    // Disable publish sidebar
    data.dispatch('core/editor').disablePublishSidebar();

    // Disable tips
    data.dispatch('core/nux').disableTips();

    // Initialize the editor
    window._wpLoadBlockEditor = new Promise(resolve => {
      domReady(() => {
        resolve(editPost.initializeEditor('editor', postType, 1, settings, {}));
      });
    });
  }

  resetLocalStorage = ev => {
    ev.preventDefault();

    localStorage.removeItem('g-editor-page');
    sessionStorage.removeItem('wp-autosave-block-editor-post-1');
    window.location.reload();
  };

  changePostType = (ev, type) => {
    ev.preventDefault();
    // update postType in localStorage before reload the editor
    const slug = type.slice(0, -1);
    changeType(slug);

    window.location.replace(type);
  };

  render () {
    const { postType } = this.state;

    return (
      <React.Fragment>

        {/* Top nav */}
        <div className="editor-top-frame">
          <a href="/"><h1>CMS Lite 3.0</h1></a>
          <div className="nav-buttons">
            <button className="active-page">Content</button>
            <button>Form Builder</button>
            <button>Assets</button>
            <button>Component Library</button>
            <button>Search Modules</button>
          </div>
          <span />
        </div>

        <div className="editor-main-flex-group">

          {/* Left nav */}
          <div className="editor-left-frame">

            {/* Search */}
            <div className="search">
              <fieldset>
                <label htmlFor="search">Search by page name or URL</label>
                <div className="search-input">
                  <input type="text" id="search"></input>
                  <button>Search</button>
                </div>
              </fieldset>
            </div>

            {/* List view */}
            <div className="list-view">
              <fieldset>
                <label>List View</label>
                <select id="list-view">
                  <option>View all</option>
                </select>
              </fieldset>
            </div>

            {/* Page action buttons */}
            <div className="button-group">
              <Dropdown
                label="Create"
                items={[
                  { id: "create", label: "Create" },
                  { id: "clone", label: "Clone" },
                  { id: "external-link", label: "External Link" },
                ]}
              />
              <Dropdown
                label="Lock"
              />
              <button>Move</button>
              <Dropdown
                label="Publish"
              />
              <Dropdown
                label="Tag"
              />
              <button>Delete</button>
            </div>

            {/* IA tree view should take up remaining vertical space */}
            <div className="ia-flex-container">
              <RecursiveTreeView
                data={
                  {
                    id: 'root',
                    name: 'Theme',
                    children: [
                      {
                        id: 'sub-theme-1',
                        name: 'Sub-theme 1',
                      },
                      {
                        id: 'sub-theme-2',
                        name: 'Sub-theme 2',
                        children: [
                          {
                            id: 'topic-1',
                            name: 'Topic',
                          },
                        ],
                      },
                      {
                        id: 'sub-theme-3',
                        name: 'Sub-theme 3',
                        children: [
                          {
                            id: 'topic-1',
                            name: 'Topic 2',
                            children: [
                              {
                                id: 'topic-2a',
                                name: 'Topic 2a',
                                children: [
                                  {
                                    id: 'topic-2a1',
                                    name: 'Topic 2a1',
                                  },
                                  {
                                    id: 'topic-2a2',
                                    name: 'Topic 2a2',
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  }
                }
              />
            </div>
          </div>

          {/* Right  */}
          <div className="editor-right-frame">
            <div className="editor-right-top-frame">
              <div className="button-group">
                <button className="active">Page</button>
                <button>Settings</button>
                <button>Metadata</button>
                <button>Usage</button>
                <button>Security</button>
                <button>History</button>
              </div>
            </div>

            <div className="editor-gutenberg-container">
              {/* G-Editor */}
              <div className="editor-nav">
                {
                  ['post', 'page'].map(type => {
                    return (
                      <button
                        key={ type }
                        className={ `components-button ${type === postType ? 'is-primary' : ''}` }
                        onClick={ ev => this.changePostType(ev, types[type].rest_base) }
                      >{ types[type].name }</button>
                    );
                  })
                }

                <button type="button" className="components-button is-tertiary"
                  onClick={ this.resetLocalStorage }>Clear page and reload</button>
              </div>
              <div id="editor" className="gutenberg__editor"></div>
            </div>

            <div className="editor-right-bottom-frame">
              <div className="button-group">
                <div className="flex-spacer">
                  <button className="active">Edit</button>
                </div>
                <div className="flex-spacer">
                  <button>View Prod</button>
                  <button>View QA</button>
                  <button className="icon"><i className="fas fa-eye"></i></button>
                  <button>Publish</button>
                  <button>Unpublish</button>
                  <button className="icon"><i className="fas fa-lock"></i></button>
                  <button className="icon"><i className="far fa-copy"></i></button>
                  <button className="icon"><i className="fas fa-link"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Editor;
