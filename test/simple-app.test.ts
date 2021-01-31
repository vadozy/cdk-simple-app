import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SimpleApp from '../lib/simple-app-stack';
import '@aws-cdk/assert/jest'; // jest matchers

test.skip('Simple App Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new SimpleApp.SimpleAppStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {
          MySimpleAppBucket6B59014A: {
            Type: 'AWS::S3::Bucket',
            Properties: {
              BucketEncryption: {
                ServerSideEncryptionConfiguration: [
                  {
                    ServerSideEncryptionByDefault: {
                      SSEAlgorithm: 'AES256',
                    },
                  },
                ],
              },
            },
            UpdateReplacePolicy: 'Delete',
            DeletionPolicy: 'Delete',
          },
        },
        Outputs: {
          MySimpleAppBucketNameExport: {
            Value: {
              Ref: 'MySimpleAppBucket6B59014A',
            },
            Export: {
              Name: 'MySimpleAppBucketName',
            },
          },
        },
      },
      MatchStyle.EXACT
    )
  );
});

test('Stack create a S3 Bucket resource', () => {
  // ARRANGE
  const app = new cdk.App();
  // ACT
  const stack = new SimpleApp.SimpleAppStack(app, 'MyTestStack');
  // ASSERT
  expect(stack).toHaveResource('AWS::S3::Bucket');
});

test('Stack create a Lambda Function resource', () => {
  // ARRANGE
  const app = new cdk.App();
  // ACT
  const stack = new SimpleApp.SimpleAppStack(app, 'MyTestStack');
  // ASSERT
  expect(stack).toHaveResource('AWS::Lambda::Function');
});
