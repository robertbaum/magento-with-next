import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link'

import { GetProducts } from './requests'

import { Card } from 'antd';
const { Meta } = Card;



export default function CmsPage(params) {
  const { id, redirectCode, relative_url, type } = params.urldata;

  const { loading, error, data } = useQuery(GetProducts, {
    variables: { category_id: id }
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error loading players.</div>;

  const response = data.products.items;

  return (
    <div>
      <h1>All List</h1>

      {response.map(item => (
        <Link href={'/' + item.canonical_url} key={item.url_key}>
          <a>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<Image alt={item.name} src={item.image.url} width={500} height={500} />}
            >
              <Meta title={item.name} description={item.sku} />
            </Card>
          </a>
        </Link>
      ))}
    </div>
  );
}

