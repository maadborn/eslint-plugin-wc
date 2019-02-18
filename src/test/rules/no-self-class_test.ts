/**
 * @fileoverview Disallows class mutations on self
 * @author James Garbutt <https://github.com/43081j>
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from '../../rules/no-self-class';
import {RuleTester} from 'eslint';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module'
  }
});

const errorMessage =
  'Classes should be considered owned by the consumer of the element, ' +
  'meaning they should never be mutated on `this`.';

ruleTester.run('no-self-class', rule, {
  valid: [
    {
      code: `class Foo {
      method() {
        this.classList.add('foo');
        this.classList.remove('foo');
        this.classList.toggle('foo');
        this.classList.replace('foo', 'bar');
        this.className = 'foo';
        this.className += 'foo';
      }
    }`
    },
    {
      code: `function x() {
      this.classList.add('foo');
      this.classList.remove('foo');
      this.classList.toggle('foo');
      this.classList.replace('foo', 'bar');
      this.className = 'foo';
      this.className += 'foo';
    }`
    },
    {
      code: `node.classList.add('foo');
      node.classList.remove('foo');
      node.classList.toggle('foo');
      node.classList.replace('foo', 'bar');
      node.className = 'foo';
      node.className += 'foo';
    `
    },
    {
      code: `class Foo extends HTMLElement {
      method(node) {
        node.classList.add('foo');
        node.classList.remove('foo');
        node.classList.toggle('foo');
        node.classList.replace('foo', 'bar');
        node.className = 'foo';
        node.className += 'foo';
      }
    }`
    },
    {
      code: `class Foo extends HTMLElement {
      method(node) {
        node.setAttribute('class', 'x');
      }
    }`
    }
  ],

  invalid: [
    {
      code: `class Foo extends HTMLElement {
        method() {
          this.classList.add('foo');
          this.classList.remove('foo');
          this.classList.toggle('foo');
          this.classList.replace('foo', 'bar');
          this.className = 'foo';
          this.className += 'foo';
        }
      }`,
      errors: [
        {
          message: errorMessage,
          line: 3,
          column: 11
        },
        {
          message: errorMessage,
          line: 4,
          column: 11
        },
        {
          message: errorMessage,
          line: 5,
          column: 11
        },
        {
          message: errorMessage,
          line: 6,
          column: 11
        },
        {
          message: errorMessage,
          line: 7,
          column: 11
        },
        {
          message: errorMessage,
          line: 8,
          column: 11
        }
      ]
    },
    {
      code: `class Foo extends HTMLElement {
        constructor() {
          this.classList.add('foo');
          this.classList.remove('foo');
          this.classList.toggle('foo');
          this.classList.replace('foo', 'bar');
          this.className = 'foo';
          this.className += 'foo';
        }
      }`,
      errors: [
        {
          message: errorMessage,
          line: 3,
          column: 11
        },
        {
          message: errorMessage,
          line: 4,
          column: 11
        },
        {
          message: errorMessage,
          line: 5,
          column: 11
        },
        {
          message: errorMessage,
          line: 6,
          column: 11
        },
        {
          message: errorMessage,
          line: 7,
          column: 11
        },
        {
          message: errorMessage,
          line: 8,
          column: 11
        }
      ]
    },
    {
      code: `class Foo extends HTMLElement {
        method() {
          if (true) {
            if (true) {
              this.classList.add('foo');
            }
          }
        }
      }`,
      errors: [
        {
          message: errorMessage,
          line: 5,
          column: 15
        }
      ]
    },
    {
      code: `class Foo extends HTMLElement {
        method() {
          this.setAttribute('class', 'foo');
        }
      }`,
      errors: [
        {
          message: errorMessage,
          line: 3,
          column: 11
        }
      ]
    }
  ]
});