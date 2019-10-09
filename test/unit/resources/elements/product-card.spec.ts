import { bootstrap } from 'aurelia-bootstrapper';
import { PLATFORM } from 'aurelia-framework';
import { StageComponent, ComponentTester } from 'aurelia-testing';

import { ProductCardCustomElement } from 'resources/elements/product-card/product-card';

describe('Product Card Element', () => {
  let component: ComponentTester<ProductCardCustomElement>;
  const product: IProduct = {
    id: '89828e46-6cff-438f-be1a-6fa9355cfe24',
    name: 'Chips',
    description: 'Nothing else to add.',
    price: 2.99,
    category: {
      id: 'e32701f8-d644-4d5d-bd52-2a31fdaba3df',
      name: 'Sundries',
      description: ' Things that go with things.',
    },
    retired: false,
  };

  beforeEach(() => {
    component = StageComponent.withResources([
      PLATFORM.moduleName(
        '../../../src/resources/elements/product-card/product-card'
      ),
      // add currency value converter here
    ])
      .inView('<product-card product.bind="product"></product-card>')
      .boundTo({
        product,
      });
  });

  afterEach(() => component.dispose());

  it('renders the correct information', async () => {
    await component.create(bootstrap);
    expect(component.element).toMatchSnapshot();
  });
});
