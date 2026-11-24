// Mock Stripe service for development
export const mockStripe = {
  createPaymentIntent: async (amount: number, currency: string = 'usd') => {
    const clientSecret = `pi_test_${Math.random().toString(36).slice(2, 11)}`;
    return {
      id: clientSecret,
      object: 'payment_intent',
      amount,
      currency,
      client_secret: clientSecret,
      status: 'requires_payment_method',
      created: Math.floor(Date.now() / 1000),
    };
  },

  confirmPayment: async (paymentIntentId: string, cardToken: string) => {
    const isFail = cardToken.endsWith('0000');
    if (isFail) {
      return { status: 'failed', error: 'Thẻ bị từ chối' };
    }
    return { status: 'succeeded', id: paymentIntentId, amount_received: 1000 };
  },

  getPaymentIntent: async (paymentIntentId: string) => {
    return { id: paymentIntentId, status: 'succeeded', amount: 1000 };
  },
};

// Mock Printful service for development (dữ liệu tiếng Việt cho demo)
export const mockPrintful = {
  getProducts: async () => {
    // Ảnh được phục vụ từ pages/public/images/products
    const img = (name: string) => `/images/products/${name}.jpg`;

    type VariantDef = [string, string, number, string?, string?];
    type ProductDef = {
      id: number;
      external_id: string;
      title: string;
      description: string;
      images: string[];
      variants: VariantDef[];
    };

    const two = (a: string, b?: string) => (b ? [img(a), img(b)] : [img(a)]);

    const defs: ProductDef[] = [
      {
        id: 1, external_id: 'tshirt-1', title: 'Áo thun cotton basic',
        description: 'Áo thun cotton mềm mại, form suông, dễ mặc hàng ngày và in thiết kế theo yêu cầu.',
        images: two('tshirt', 'tshirt-alt'),
        variants: [
          ['s-trang', 'S / Trắng', 14.99, 'S', 'Trắng'], ['m-trang', 'M / Trắng', 14.99, 'M', 'Trắng'],
          ['l-trang', 'L / Trắng', 14.99, 'L', 'Trắng'], ['xl-trang', 'XL / Trắng', 15.99, 'XL', 'Trắng'],
          ['s-den', 'S / Đen', 14.99, 'S', 'Đen'], ['m-den', 'M / Đen', 14.99, 'M', 'Đen'],
        ],
      },
      {
        id: 2, external_id: 'hoodie-1', title: 'Áo hoodie nỉ',
        description: 'Áo hoodie nỉ dày vừa phải, mũ trùm đầu và túi kangaroo tiện lợi.',
        images: two('hoodie'),
        variants: [
          ['s-xam', 'S / Xám', 34.99, 'S', 'Xám'], ['m-xam', 'M / Xám', 34.99, 'M', 'Xám'],
          ['l-xam', 'L / Xám', 34.99, 'L', 'Xám'], ['xl-xam', 'XL / Xám', 36.99, 'XL', 'Xám'],
        ],
      },
      {
        id: 3, external_id: 'sweatshirt-1', title: 'Áo nỉ cổ tròn',
        description: 'Áo nỉ cổ tròn chất liệu mềm, giữ ấm tốt, phù hợp mặc nhiều lớp trong mùa lạnh.',
        images: two('sweatshirt'),
        variants: [
          ['s-den', 'S / Đen', 29.99, 'S', 'Đen'], ['m-den', 'M / Đen', 29.99, 'M', 'Đen'],
          ['l-den', 'L / Đen', 29.99, 'L', 'Đen'], ['xl-den', 'XL / Đen', 31.99, 'XL', 'Đen'],
        ],
      },
      {
        id: 4, external_id: 'mug-1', title: 'Cốc cà phê sứ',
        description: 'Cốc sứ bóng, nhẵn, dụng tích 11oz và 15oz — lý tưởng để in hình cá nhân.',
        images: two('mug'),
        variants: [
          ['11oz', '11 oz / Trắng', 9.99, '11 oz', 'Trắng'], ['15oz', '15 oz / Trắng', 12.99, '15 oz', 'Trắng'],
        ],
      },
      {
        id: 5, external_id: 'cap-1', title: 'Mũ lưỡi trai',
        description: 'Mũ lưỡi trai 6 panels, form cứng cáp, dây điều chỉnh phía sau.',
        images: two('cap', 'cap-alt'),
        variants: [
          ['den', 'Đen', 16.99, undefined, 'Đen'], ['trang', 'Trắng', 16.99, undefined, 'Trắng'],
        ],
      },
      {
        id: 6, external_id: 'sneakers-1', title: 'Giày sneaker chạy bộ',
        description: 'Giày thể thao knit nhẹ, đệm êm, phù hợp chạy bộ và đi lại hằng ngày.',
        images: two('sneakers', 'sneakers-alt'),
        variants: [
          ['us7', 'US 7 / Đỏ', 59.99, 'US 7', 'Đỏ'], ['us8', 'US 8 / Đỏ', 59.99, 'US 8', 'Đỏ'],
          ['us9', 'US 9 / Đỏ', 59.99, 'US 9', 'Đỏ'], ['us10', 'US 10 / Đỏ', 59.99, 'US 10', 'Đỏ'],
        ],
      },
      {
        id: 7, external_id: 'backpack-1', title: 'Ba lô đựng laptop',
        description: 'Ba lô chống thấm nước, có ngăn đựng laptop riêng và dây đeo êm vai.',
        images: two('backpack', 'backpack-alt'),
        variants: [
          ['15', '15 inch / Xanh navy', 45.99, '15 inch', 'Xanh navy'],
          ['17', '17 inch / Xanh navy', 49.99, '17 inch', 'Xanh navy'],
        ],
      },
      {
        id: 8, external_id: 'watch-1', title: 'Đồng hồ thông minh',
        description: 'Đồng hồ thông minh thiết kế tối giản, dây silicone thoáng tay.',
        images: two('watch', 'watch-alt'),
        variants: [
          ['40mm', '40 mm / Trắng', 79.99, '40 mm', 'Trắng'],
          ['44mm', '44 mm / Trắng', 84.99, '44 mm', 'Trắng'],
        ],
      },
      {
        id: 9, external_id: 'sunglasses-1', title: 'Kính mát tròn',
        description: 'Kính mát gọng tròn nhẹ, tròng kính màu, chống tia UV tốt.',
        images: two('sunglasses', 'sunglasses-alt'),
        variants: [
          ['vang', 'Vàng / Xanh lá', 24.99, undefined, 'Vàng'],
          ['den', 'Đen / Xám', 24.99, undefined, 'Đen'],
        ],
      },
      {
        id: 10, external_id: 'poster-1', title: 'Tranh treo tường Botanical',
        description: 'Tranh in chất liệu matte cao cấp, sẵn sàng để khung và treo tường.',
        images: two('poster'),
        variants: [
          ['18x24', '18 x 24 inch', 19.99, '18 x 24 inch', undefined],
          ['24x36', '24 x 36 inch', 29.99, '24 x 36 inch', undefined],
        ],
      },
      {
        id: 11, external_id: 'tote-1', title: 'Túi tote canvas',
        description: 'Túi canvas bền chắc, quai dài, thân thiện môi trường và dễ in hình.',
        images: two('tote-bag'),
        variants: [
          ['tu-nhien', 'Màu tự nhiên', 12.99, undefined, 'Tự nhiên'],
          ['den', 'Màu đen', 12.99, undefined, 'Đen'],
        ],
      },
      {
        id: 12, external_id: 'phonecase-1', title: 'Ốp lưng điện thoại',
        description: 'Ốp lưng mỏng nhẹ, bảo vệ cạnh máy và có mặt sau để in thiết kế.',
        images: two('phone-case'),
        variants: [
          ['iphone', 'iPhone', 18.99, 'iPhone', 'Đen'],
          ['android', 'Android', 18.99, 'Android', 'Đen'],
        ],
      },
      {
        id: 13, external_id: 'bottle-1', title: 'Bình nước giữ nhiệt',
        description: 'Bình inox giữ nhiệt, giữ nước lạnh cả ngày, tiện lợi khi đi du lịch.',
        images: two('water-bottle'),
        variants: [
          ['500ml', '500 ml / Xanh lá', 22.99, '500 ml', 'Xanh lá'],
          ['750ml', '750 ml / Xanh lá', 25.99, '750 ml', 'Xanh lá'],
        ],
      },
      {
        id: 14, external_id: 'pillow-1', title: 'Gối ngủ cao cấp',
        description: 'Gối mềm, chống dị ứng, vỏ gối có thể tháo rời và giặt máy dễ dàng.',
        images: two('pillow'),
        variants: [
          ['tieuchuan', 'Gối tiêu chuẩn / Trắng', 27.99, 'Tiêu chuẩn', 'Trắng'],
          ['king', 'Gối King / Trắng', 32.99, 'King', 'Trắng'],
        ],
      },
      {
        id: 15, external_id: 'tshirt-2', title: 'Áo thun nam cổ tròn',
        description: 'Áo thun nam form thể thao, chất liệu thoáng mát, dễ phối đồ.',
        images: two('extra-06'),
        variants: [['s', 'S / Trắng', 15.99, 'S', 'Trắng'], ['m', 'M / Trắng', 15.99, 'M', 'Trắng'], ['l', 'L / Trắng', 15.99, 'L', 'Trắng']],
      },
      {
        id: 16, external_id: 'tshirt-3', title: 'Áo thun nữ basic',
        description: 'Áo thun nữ kiểu dáng nhẹ nhàng, phù hợp in họa tiết cá nhân.',
        images: two('extra-02'),
        variants: [['s', 'S / Trắng', 16.99, 'S', 'Trắng'], ['m', 'M / Trắng', 16.99, 'M', 'Trắng'], ['l', 'L / Trắng', 16.99, 'L', 'Trắng']],
      },
      {
        id: 17, external_id: 'tshirt-4', title: 'Áo thun in họa tiết',
        description: 'Áo thun thiết kế graphic, chất liệu cotton co giãn nhẹ.',
        images: two('extra-03'),
        variants: [['m', 'M / Đen', 18.99, 'M', 'Đen'], ['l', 'L / Đen', 18.99, 'L', 'Đen'], ['xl', 'XL / Đen', 19.99, 'XL', 'Đen']],
      },
      {
        id: 18, external_id: 'hoodie-2', title: 'Áo hoodie có khóa kéo',
        description: 'Áo hoodie zip tiện lợi, nỉ dày, giữ ấm tốt cho mùa đông.',
        images: two('extra-04'),
        variants: [['m', 'M / Xám', 39.99, 'M', 'Xám'], ['l', 'L / Xám', 39.99, 'L', 'Xám'], ['xl', 'XL / Xám', 41.99, 'XL', 'Xám']],
      },
      {
        id: 19, external_id: 'hoodie-3', title: 'Áo hoodie nữ form rộng',
        description: 'Hoodie nữ form rộng, mềm mại, phù hợp mặc dạo phố.',
        images: two('hoodie'),
        variants: [['s', 'S / Hồng', 37.99, 'S', 'Hồng'], ['m', 'M / Hồng', 37.99, 'M', 'Hồng'], ['l', 'L / Hồng', 37.99, 'L', 'Hồng']],
      },
      {
        id: 20, external_id: 'sweatshirt-2', title: 'Áo nỉ basic',
        description: 'Áo nỉ đơn giản, dễ phối, chất liệu cotton giữ form tốt.',
        images: two('sweatshirt'),
        variants: [['m', 'M / Đen', 31.99, 'M', 'Đen'], ['l', 'L / Đen', 31.99, 'L', 'Đen'], ['xl', 'XL / Đen', 33.99, 'XL', 'Đen']],
      },
      {
        id: 21, external_id: 'jacket-1', title: 'Áo khoác gió nhẹ',
        description: 'Áo khoác gió chống thấm nhẹ, gọn nhẹ, phù hợp đi du lịch.',
        images: two('extra-16'),
        variants: [['m', 'M / Xanh navy', 49.99, 'M', 'Xanh navy'], ['l', 'L / Xanh navy', 49.99, 'L', 'Xanh navy']],
      },
      {
        id: 22, external_id: 'jacket-2', title: 'Áo khoác bomber',
        description: 'Áo khoác bomber form cổ điển, bo gọn tay và eo.',
        images: two('extra-15'),
        variants: [['m', 'M / Đen', 64.99, 'M', 'Đen'], ['l', 'L / Đen', 64.99, 'L', 'Đen']],
      },
      {
        id: 23, external_id: 'jacket-3', title: 'Áo khoác da',
        description: 'Áo khoác da bóng, phong cách cá tính, giữ ấm tốt.',
        images: two('extra-14'),
        variants: [['m', 'M / Đen', 89.99, 'M', 'Đen'], ['l', 'L / Đen', 89.99, 'L', 'Đen']],
      },
      {
        id: 24, external_id: 'vest-1', title: 'Áo vest nam',
        description: 'Vest nam cắt may gọn gàng, phù hợp đi làm và sự kiện.',
        images: two('extra-13'),
        variants: [['m', 'M / Xám', 69.99, 'M', 'Xám'], ['l', 'L / Xám', 69.99, 'L', 'Xám']],
      },
      {
        id: 25, external_id: 'shirt-1', title: 'Áo sơ mi dài tay',
        description: 'Sơ mi dài tay chất liệu mát, form suông, dễ phối công sở.',
        images: two('extra-01'),
        variants: [['m', 'M / Trắng', 34.99, 'M', 'Trắng'], ['l', 'L / Trắng', 34.99, 'L', 'Trắng']],
      },
      {
        id: 26, external_id: 'shirt-2', title: 'Áo sơ mi ngắn tay',
        description: 'Sơ mi ngắn tay thoáng mát, phù hợp mùa hè và đi chơi.',
        images: two('extra-08'),
        variants: [['m', 'M / Xanh dương', 29.99, 'M', 'Xanh dương'], ['l', 'L / Xanh dương', 29.99, 'L', 'Xanh dương']],
      },
      {
        id: 27, external_id: 'cap-2', title: 'Mũ snapback',
        description: 'Mũ snapback lưng lưới, form cao, dễ chỉnh size.',
        images: two('cap-alt'),
        variants: [['den', 'Đen', 19.99, undefined, 'Đen'], ['trang', 'Trắng', 19.99, undefined, 'Trắng']],
      },
      {
        id: 28, external_id: 'cap-3', title: 'Mũ bucket',
        description: 'Mũ bucket thời trang, chống nắng tốt, phù hợp đi biển.',
        images: two('cap'),
        variants: [['nau', 'Nâu', 21.99, undefined, 'Nâu'], ['den', 'Đen', 21.99, undefined, 'Đen']],
      },
      {
        id: 29, external_id: 'sneakers-2', title: 'Giày sneaker trắng',
        description: 'Giày sneaker trắng tối giản, dễ phối với mọi trang phục.',
        images: two('extra-20'),
        variants: [['us7', 'US 7 / Trắng', 54.99, 'US 7', 'Trắng'], ['us8', 'US 8 / Trắng', 54.99, 'US 8', 'Trắng'], ['us9', 'US 9 / Trắng', 54.99, 'US 9', 'Trắng']],
      },
      {
        id: 30, external_id: 'sneakers-3', title: 'Giày sneaker nữ',
        description: 'Giày thể thao nữ nhẹ nhàng, đế mềm, đi lâu không mỏi.',
        images: two('extra-21'),
        variants: [['us6', 'US 6 / Hồng', 52.99, 'US 6', 'Hồng'], ['us7', 'US 7 / Hồng', 52.99, 'US 7', 'Hồng']],
      },
      {
        id: 31, external_id: 'sneakers-4', title: 'Giày chạy bộ chuyên dụng',
        description: 'Giày chạy bộ đế êm, thoáng khí, hỗ trợ cú chạm đất.',
        images: two('extra-24'),
        variants: [['us8', 'US 8 / Xanh dương', 69.99, 'US 8', 'Xanh dương'], ['us9', 'US 9 / Xanh dương', 69.99, 'US 9', 'Xanh dương']],
      },
      {
        id: 32, external_id: 'sneakers-5', title: 'Giày thể thao cổ thấp',
        description: 'Giày cổ thấp thiết kế gọn, phù hợp tập gym và đi lại hằng ngày.',
        images: two('extra-19'),
        variants: [['us8', 'US 8 / Xám', 49.99, 'US 8', 'Xám'], ['us9', 'US 9 / Xám', 49.99, 'US 9', 'Xám']],
      },
      {
        id: 33, external_id: 'backpack-2', title: 'Ba lô du lịch',
        description: 'Ba lô dung tích lớn, nhiều ngăn, phù hợp chuyến đi dài ngày.',
        images: two('extra-25'),
        variants: [['35l', '35 l / Xám', 59.99, '35 l', 'Xám'], ['45l', '45 l / Xám', 69.99, '45 l', 'Xám']],
      },
      {
        id: 34, external_id: 'bag-1', title: 'Túi đựng laptop',
        description: 'Túi xách đựng laptop 15 inch, có ngăn phụ và dây đeo vai.',
        images: two('backpack-alt'),
        variants: [['15', '15 inch / Đen', 44.99, '15 inch', 'Đen'], ['17', '17 inch / Đen', 49.99, '17 inch', 'Đen']],
      },
      {
        id: 35, external_id: 'bag-2', title: 'Túi xách tay',
        description: 'Túi xách tay thanh thoát, phù hợp đi làm và dạo phố.',
        images: two('extra-33'),
        variants: [['nau', 'Nâu', 39.99, undefined, 'Nâu'], ['den', 'Đen', 39.99, undefined, 'Đen']],
      },
      {
        id: 36, external_id: 'watch-2', title: 'Đồng hồ thể thao',
        description: 'Đồng hồ thể thao chống nước, theo dõi bước chân và nhịp tim.',
        images: two('extra-28'),
        variants: [['42mm', '42 mm / Đen', 89.99, '42 mm', 'Đen'], ['46mm', '46 mm / Đen', 94.99, '46 mm', 'Đen']],
      },
      {
        id: 37, external_id: 'watch-3', title: 'Đồng hồ cổ điển',
        description: 'Đồng hồ cơ cổ điển, dây da, thiết kế thanh lịch.',
        images: two('extra-27'),
        variants: [['den', 'Dây đen', 119.99, undefined, 'Đen'], ['nau', 'Dây nâu', 119.99, undefined, 'Nâu']],
      },
      {
        id: 38, external_id: 'sunglasses-2', title: 'Kính mát vuông',
        description: 'Kính mát gọng vuông cá tính, tròng kính chống chói.',
        images: two('extra-30'),
        variants: [['den', 'Đen', 27.99, undefined, 'Đen'], ['nau', 'Nâu', 27.99, undefined, 'Nâu']],
      },
      {
        id: 39, external_id: 'sunglasses-3', title: 'Kính mát phi công',
        description: 'Kính phi công gọng kim loại, phong cách cổ điển.',
        images: two('sunglasses-alt'),
        variants: [['vang', 'Vàng', 29.99, undefined, 'Vàng'], ['bac', 'Bạc', 29.99, undefined, 'Bạc']],
      },
      {
        id: 40, external_id: 'poster-2', title: 'Tranh canvas trừu tượng',
        description: 'Tranh canvas sắc nét, in nghệ thuật trừu tượng cho phòng khách.',
        images: two('extra-32'),
        variants: [['40x60', '40 x 60 cm', 34.99, '40 x 60 cm', undefined], ['60x90', '60 x 90 cm', 49.99, '60 x 90 cm', undefined]],
      },
      {
        id: 41, external_id: 'poster-3', title: 'Tranh phong cảnh treo tường',
        description: 'Tranh phong cảnh in matte, tôn thêm vẻ đẹp cho góc làm việc.',
        images: two('extra-32'),
        variants: [['30x45', '30 x 45 cm', 24.99, '30 x 45 cm', undefined], ['50x70', '50 x 70 cm', 39.99, '50 x 70 cm', undefined]],
      },
      {
        id: 42, external_id: 'tote-2', title: 'Túi tote in hoa văn',
        description: 'Túi tote canvas họa tiết, quai chắc, sức chứa lớn.',
        images: two('tote-bag'),
        variants: [['nau', 'Nâu', 15.99, undefined, 'Nâu'], ['den', 'Đen', 15.99, undefined, 'Đen']],
      },
      {
        id: 43, external_id: 'mug-2', title: 'Cốc sứ màu',
        description: 'Cốc sứ men màu, cảm giác cầm tay dễ chịu, dùng được mỗi ngày.',
        images: two('mug'),
        variants: [['11oz', '11 oz / Xanh', 11.99, '11 oz', 'Xanh'], ['15oz', '15 oz / Xanh', 13.99, '15 oz', 'Xanh']],
      },
      {
        id: 44, external_id: 'mug-3', title: 'Cốc giữ nhiệt có nắp',
        description: 'Cốc giữ nhiệt kèm nắp, tiện lợi mang theo khi đi làm.',
        images: two('new-4'),
        variants: [['350ml', '350 ml / Trắng', 17.99, '350 ml', 'Trắng'], ['450ml', '450 ml / Trắng', 19.99, '450 ml', 'Trắng']],
      },
      {
        id: 45, external_id: 'bottle-2', title: 'Bình nước thể thao',
        description: 'Bình nước nhựa an toàn, nắp uống tiện lợi, phù hợp tập luyện.',
        images: two('extra-37'),
        variants: [['750ml', '750 ml / Đen', 19.99, '750 ml', 'Đen'], ['1000ml', '1000 ml / Đen', 22.99, '1000 ml', 'Đen']],
      },
      {
        id: 46, external_id: 'pillow-2', title: 'Gối chữ U du lịch',
        description: 'Gối chữ U mềm, hỗ trợ cổ khi ngồi máy bay hoặc xe dài.',
        images: two('pillow'),
        variants: [['xam', 'Xám', 19.99, undefined, 'Xám'], ['xanh', 'Xanh dương', 19.99, undefined, 'Xanh dương']],
      },
      {
        id: 47, external_id: 'blanket-1', title: 'Chăn mỏng mùa hè',
        description: 'Chăn mỏng thoáng khí, giữ ấm nhẹ cho những đêm mát.',
        images: two('new-6'),
        variants: [['150x200', '150 x 200 cm', 34.99, '150 x 200 cm', undefined], ['200x220', '200 x 220 cm', 44.99, '200 x 220 cm', undefined]],
      },
      {
        id: 48, external_id: 'phonecase-2', title: 'Ốp lưng máy tính bảng',
        description: 'Ốp lưng máy tính bảng chống va đập nhẹ, bề mặt dễ in hình.',
        images: two('extra-40'),
        variants: [['ipad', 'iPad', 24.99, 'iPad', 'Đen'], ['android', 'Android', 24.99, 'Android', 'Đen']],
      },
      {
        id: 49, external_id: 'headphones-1', title: 'Tai nghe Bluetooth',
        description: 'Tai nghe không dây, âm thanh rõ, pin dùng cả ngày.',
        images: two('extra-41'),
        variants: [['den', 'Đen', 49.99, undefined, 'Đen'], ['trang', 'Trắng', 49.99, undefined, 'Trắng']],
      },
      {
        id: 50, external_id: 'headphones-2', title: 'Tai nghe chụp tai',
        description: 'Tai nghe chụp tai đệm mềm, cách âm tốt, phù hợp nghe nhạc.',
        images: two('extra-42'),
        variants: [['den', 'Đen', 69.99, undefined, 'Đen'], ['xam', 'Xám', 69.99, undefined, 'Xám']],
      },
      {
        id: 51, external_id: 'speaker-1', title: 'Loa Bluetooth mini',
        description: 'Loa nhỏ gọn, kết nối nhanh, âm bass chắc cho không gian nhỏ.',
        images: two('new-1', 'new-2'),
        variants: [['den', 'Đen', 39.99, undefined, 'Đen'], ['do', 'Đỏ', 39.99, undefined, 'Đỏ']],
      },
      {
        id: 52, external_id: 'camera-1', title: 'Camera du lịch compact',
        description: 'Camera nhỏ gọn, dễ mang theo, chụp ảnh sáng rõ khi đi du lịch.',
        images: two('extra-44', 'extra-45'),
        variants: [['den', 'Đen', 299.99, undefined, 'Đen'], ['bac', 'Bạc', 299.99, undefined, 'Bạc']],
      },
      {
        id: 53, external_id: 'scarf-1', title: 'Khăn quàng cổ',
        description: 'Khăn mềm, nhẹ, giữ ấm cổ trong những ngày se lạnh.',
        images: two('new-5'),
        variants: [['xam', 'Xám', 24.99, undefined, 'Xám'], ['nau', 'Nâu', 24.99, undefined, 'Nâu']],
      },
      {
        id: 54, external_id: 'travelbag-1', title: 'Túi du lịch cỡ lớn',
        description: 'Túi du lịch chịu lực, nhiều ngăn, thích hợp cho chuyến đi cuối tuần.',
        images: two('extra-34'),
        variants: [['40l', '40 l / Đen', 54.99, '40 l', 'Đen'], ['60l', '60 l / Đen', 64.99, '60 l', 'Đen']],
      },
    ];

    return defs.map((def) => ({
      id: def.id,
      external_id: def.external_id,
      title: def.title,
      description: def.description,
      images: def.images,
      variants: def.variants.map(([key, title, price, size, color], index) => ({
        id: def.id * 1000 + index,
        external_id: `${def.external_id}-${key}`,
        title,
        size,
        color,
        price,
        image: def.images[0],
        images: def.images,
      })),
    }));
  },

  createOrder: async (items: any[], designFileUrl?: string) => {
    const orderId = `don-mock-${Math.random().toString(36).slice(2, 11)}`;
    return { id: orderId, external_id: orderId, status: 'pending', items, shipping: { address1: 'Địa chỉ thử nghiệm' } };
  },

  getOrder: async (orderId: string) => {
    return { id: orderId, status: 'in_production', shipments: [] };
  },

  syncProducts: async () => {
    const products = await mockPrintful.getProducts();
    return { products, synced_at: Date.now(), count: products.length };
  },
};

// Dịch vụ email giả lập cho phát triển
export const mockMailchannels = {
  sendEmail: async (to: string, subject: string, html: string) => {
    console.log(`📧 [EMAIL MOCK]\nNgười nhận: ${to}\nTiêu đề: ${subject}\n---\n${html}\n---`);
    return { success: true, message: 'Email đã được ghi nhật ký' };
  },

  sendOrderConfirmation: async (email: string, orderId: string, items: any[]) => {
    const html = `
      <h2>Xác nhận đơn hàng</h2>
      <p>Cảm ơn bạn đã đặt hàng!</p>
      <p>Mã đơn hàng: ${orderId}</p>
      <h3>Sản phẩm:</h3>
      <ul>
        ${items.map((item) => `<li>${item.name} x ${item.quantity}</li>`).join('')}
      </ul>
    `;
    return mockMailchannels.sendEmail(email, 'Xác nhận đơn hàng', html);
  },

  sendPasswordReset: async (email: string, resetToken: string) => {
    const html = `
      <h2>Đặt lại mật khẩu</h2>
      <p><a href="http://localhost:5173/reset-password?token=${resetToken}">Nhấn vào đây để đặt lại mật khẩu</a></p>
      <p>Liên kết này hết hạn sau 1 giờ.</p>
    `;
    return mockMailchannels.sendEmail(email, 'Đặt lại mật khẩu', html);
  },
};

// Chọn dịch vụ theo môi trường
export async function getStripeService(useMocks: boolean) {
  return useMocks ? mockStripe : null;
}

export async function getPrintfulService(useMocks: boolean) {
  return useMocks ? mockPrintful : null;
}

export async function getMailchannelsService(useMocks: boolean) {
  return useMocks ? mockMailchannels : null;
}
