import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface MailLayoutProps {
  preview: string;
  showContact?: boolean;
}

export const MailLayout = ({
  preview,
  children,
  showContact = true,
}: React.PropsWithChildren<MailLayoutProps>) => {
  return (
    <Html>
      <Head />

      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: '#efeef1',
                primary: '#9146FF',
                secondary: '#eee',
              },
              fontFamily: {
                sans: ['HelveticaNeue,Helvetica,Arial'],
              },
            },
          },
        }}
      >
        <Body className="bg-background font-sans">
          <Preview>{preview}</Preview>

          <div className="bg-background h-4" />

          <Container
            className="max-w-[580px] mx-auto bg-white rounded-md"
            style={{ marginTop: 10 }}
          >
            <Section>
              <Img
                width={150}
                src="https://i.imgur.com/6667TPf.png"
                alt="Elcast"
                className="mx-auto"
              />
            </Section>

            <Section className="w-full">
              <Row>
                <Column
                  className="w-[250px] border-b border-b-secondary"
                  style={{ borderBottomStyle: 'solid' }}
                />
                <Column
                  className="w-[150px] border-b border-b-primary"
                  style={{ borderBottomStyle: 'solid' }}
                />
                <Column
                  className="w-[250px] border-b border-b-secondary"
                  style={{ borderBottomStyle: 'solid' }}
                />
              </Row>
            </Section>

            <Section className="px-4">{children}</Section>

            {showContact && (
              <>
                <Hr className="border-secondary m-0" />

                <Section className="px-4">
                  <Text className="text-sm text-black">
                    Still have questions? Please contact{' '}
                    <Link
                      href="mailto:contact@eldarcodes.com"
                      className="underline"
                    >
                      Elcast Support
                    </Link>
                  </Text>
                  <Text className="text-sm text-black">
                    Thanks,
                    <br />
                    Elcast Team
                  </Text>
                </Section>
              </>
            )}
          </Container>

          <Section className="max-w-[580px] mx-auto">
            <Row>
              <Text className="text-center text-gray-500">
                © {new Date().getFullYear()} Elcast, All Rights Reserved
              </Text>
            </Row>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};
