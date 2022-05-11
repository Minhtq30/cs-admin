export const filterConfigs = [
  {
    span: 6,
    items: {
      search: {
        span: 24,
        type: 'GInput',
        properties: {
          placeholder: 'Nhập mã shop, tên shop, SĐT để tìm kiếm',
        },
        icons: {
          prefix: {
            type: 'SearchOutlined',
            style: {
              fontSize: '20px',
              color: '#069255',
            },
          },
        },
        style: {
          width: '588px',
        },
      },
    },
  },
  {
    span: 18,
    items: {
      province: {
        span: 4,
        type: 'GSelect',
        properties: {
          mode: 'multiple',
          showSearch: true,
          placeholder: 'Tỉnh/TP',

          options: [
            { value: '1', label: 'Hà Nội' },
            { value: '2', label: 'Hồ Chí Minh' },
            { value: '3', label: 'Đà Nẵng' },
          ],
        },
        style: {
          width: '200px',
        },
      },
      district: {
        span: 4,
        type: 'GSelect',
        properties: {
          showSearch: true,
          placeholder: 'Quận/Huyện',

          options: [
            { value: '1', label: 'Hà Nội' },
            { value: '2', label: 'Hồ Chí Minh' },
            { value: '3', label: 'Đà Nẵng' },
          ],
        },
        style: {
          width: '200px',
        },
      },
      shop_type: {
        span: 4,
        type: 'GSelect',
        properties: {
          showSearch: true,
          placeholder: 'Loại shop',

          options: [
            { value: '1', label: 'B2C' },
            { value: '2', label: 'C2c' },
          ],
        },
        style: {
          width: '200px',
        },
      },
      cs_care: {
        span: 4,
        type: 'GSelect',
        properties: {
          showSearch: true,
          placeholder: 'CS care',

          options: [
            { value: '1', label: 'Service1' },
            { value: '2', label: 'Service2' },
          ],
        },
        style: {
          width: '200px',
        },
      },
      activation: {
        span: 4,
        type: 'GSelect',
        properties: {
          showSearch: true,
          placeholder: 'Kích hoạt',

          options: [
            { value: '1', label: 'Service1' },
            { value: '2', label: 'Service2' },
          ],
        },
        style: {
          width: '200px',
        },
      },
      status: {
        span: 4,
        type: 'GSelect',
        properties: {
          showSearch: true,
          placeholder: 'Trạng thái sự dụng',

          options: [
            { value: '1', label: 'Service1' },
            { value: '2', label: 'Service2' },
          ],
        },
        style: {
          width: '200px',
        },
      },
    },
  },
  {
    span: 9,
    items: {
      created_date: {
        span: 8,
        type: 'GDatePicker',
        properties: {
          placeholder: 'Thời gian tạo shop',
        },
        style: {
          width: '225px',
        },
      },
      sent_mail_date: {
        span: 8,
        type: 'GDatePicker',
        properties: {
          placeholder: 'Thời gian ngừng đơn',
        },
        style: {
          width: '225px',
        },
      },
      ceased_order_date: {
        span: 8,
        type: 'GDatePicker',
        properties: {
          placeholder: 'Thời gian gửi email',
        },
        style: {
          width: '225px',
        },
      },
    },
  },
  {
    span: 15,
    items: {
      protential: {
        span: 4,
        type: 'GSelect',
        properties: {
          placeholder: 'Tiềm năng',

          options: [
            { value: '1', label: 'Service1' },
            { value: '2', label: 'Service2' },
          ],
        },
        style: {
          width: '180px',
        },
      },
      advisory: {
        span: 4,
        type: 'GSelect',
        properties: {
          placeholder: 'Tư vấn',

          options: [
            { value: '1', label: 'Service1' },
            { value: '2', label: 'Service2' },
          ],
        },
        style: {
          width: '180px',
        },
      },
      needs: {
        span: 4,
        type: 'GSelect',
        properties: {
          placeholder: 'Nhu cầu',

          options: [
            { value: '1', label: 'Service1' },
            { value: '2', label: 'Service2' },
          ],
        },
        style: {
          width: '180px',
        },
      },
      audit_type: {
        span: 4,
        type: 'GSelect',
        properties: {
          placeholder: 'Kiểu đối soát',

          options: [
            { value: '1', label: 'Service1' },
            { value: '2', label: 'Service2' },
          ],
        },
        style: {
          width: '180px',
        },
      },
      creator: {
        span: 4,
        type: 'GSelect',
        properties: {
          placeholder: 'Người tạo shop',

          options: [
            { value: '1', label: 'Service1' },
            { value: '2', label: 'Service2' },
          ],
        },
        style: {
          width: '180px',
        },
      },
      regist_source: {
        span: 4,
        type: 'GSelect',
        properties: {
          placeholder: 'Nguồn đăng ký',

          options: [
            { value: '1', label: 'Service1' },
            { value: '2', label: 'Service2' },
          ],
        },
        style: {
          width: '180px',
        },
      },
    },
  },
];

export const tableColumns = [
  {
    title: 'Mã/tên shop',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    width: 135,
  },
  {
    title: 'Thông tin đăng ký',
    dataIndex: 'info',
    key: 'info',
  },
  {
    title: 'Đặc điểm',
    dataIndex: 'feature',
    key: 'feature',
    width: 333,
  },
  {
    title: 'Care shop',
    dataIndex: 'care_shop',
    key: 'care_shop',
    width: 300,
  },
  {
    title: 'Ghi chú nhanh',
    dataIndex: 'cs_note',
    key: 'cs_note',
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 148,
  },
];

export const shopStatusOptions = [
  {
    value: 1,
    label: 'Đang làm việc',
  },
  {
    value: 2,
    label: 'Đã dừng',
  },
  {
    value: 3,
    label: 'Chưa kiểm duyệt',
  },
  {
    value: 4,
    label: 'Tiếp tục liên hệ',
  },
];
