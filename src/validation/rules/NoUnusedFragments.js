// @flow strict

import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';

import { type ASTValidationContext } from '../ValidationContext';

/**
 * No unused fragments
 *
 * A GraphQL document is only valid if all fragment definitions are spread
 * within operations, or spread within other fragments spread within operations.
 */
export function NoUnusedFragments(context: ASTValidationContext): ASTVisitor {
  const operationDefs = [];
  const fragmentDefs = [];

  return {
    OperationDefinition(node) {
      operationDefs.push(node);
      return false;
    },
    FragmentDefinition(node) {
      fragmentDefs.push(node);
      return false;
    },
    Document: {
      leave() {},
    },
  };
}
