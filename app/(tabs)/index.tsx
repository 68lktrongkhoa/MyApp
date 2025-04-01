import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import SVG components
import EmptyOrderSvg from '@/assets/images/empty-order.svg';
import Ghim from '@/assets/images/ghim.svg';
import GhimEle from '@/assets/images/ghimele.svg';
import GhimEle2 from '@/assets/images/ghimele2.svg';
import Menuline from '@/assets/images/menu-line.svg';
import Frame from '@/assets/images/frame.svg';
import Search from '@/assets/images/search.svg';
import StatusIcon from '@/assets/images/status.svg';
import UnableghimIcon from '@/assets/images/unableGhim.svg';
import InforIcon from '@/assets/images/infor.svg';

const { height: windowHeight } = Dimensions.get('window');

type StatusFilters = {
  notProduced: boolean;
  inProduction: boolean;
  completed: boolean;
};

type OrderItem = {
  id: string;
  code: string;
  deadline: string;
  progress1: number;
  progress2: number;
  status: keyof StatusFilters;
  pinned: boolean;
};

const ProductionOrderScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [pinnedOrders, setPinnedOrders] = useState<string[]>(['1', '2', '3', '4', '5', '6']);

  const handleInfoPress = (order: OrderItem) => {
    setSelectedOrder(order);
    setInfoModalVisible(true);
  };

  const togglePinOrder = (orderId: string) => {
    setPinnedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) // Bỏ ghim nếu đã ghim
        : [...prev, orderId] // Ghim nếu chưa ghim
    );
  };
  const [statusFilters, setStatusFilters] = useState<StatusFilters>({
    notProduced: true,
    inProduction: true,
    completed: false,
  });
  const translateX = useRef(new Animated.Value(-200)).current;

  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: '1',
      code: 'LSX-13032514',
      deadline: '13/03/2025',
      progress1: 50,
      progress2: 90,
      status: 'notProduced',
      pinned: true
    },
    {
      id: '2',
      code: 'LSX-14032515',
      deadline: '14/03/2025',
      progress1: 70,
      progress2: 85,
      status: 'inProduction',
      pinned: true
    },
    {
      id: '3',
      code: 'LSX-15032516',
      deadline: '15/03/2025',
      progress1: 100,
      progress2: 100,
      status: 'completed',
      pinned: true
    },
    {
      id: '4',
      code: 'LSX-16032517',
      deadline: '16/03/2025',
      progress1: 30,
      progress2: 60,
      status: 'notProduced',
      pinned: true
    },
    {
      id: '5',
      code: 'LSX-17032518',
      deadline: '17/03/2025',
      progress1: 80,
      progress2: 95,
      status: 'inProduction',
      pinned: true
    },
    {
      id: '6',
      code: 'LSX-18032519',
      deadline: '18/03/2025',
      progress1: 100,
      progress2: 100,
      status: 'completed',
      pinned: true
    },
  ]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(translateX, {
      toValue: menuVisible ? -200 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const toggleStatusFilter = (status: keyof StatusFilters) => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  const unpinAllOrders = () => {
    setOrders(orders.map(order => ({ ...order, pinned: false })));
  };

  const statusOptions = [
    { key: 'notProduced', label: 'Chưa sản xuất', color: '#C25705', backgroundColor: '#FF811A26' },
    { key: 'inProduction', label: 'Đang sản xuất', color: '#076A94', backgroundColor: '#3EC3F733' },
    { key: 'completed', label: 'Hoàn thành', color: '#1A7526', backgroundColor: '#35BD4B33' },
  ];

  const renderOrderItem = (order: OrderItem) => {
    const statusOption = statusOptions.find(opt => opt.key === order.status);
    const isPinned = pinnedOrders.includes(order.id);

    return (
      <View key={order.id} style={[styles.orderContainer, order.pinned && styles.pinnedOrder]}>
        <View style={[styles.statusGroup, { borderLeftColor: statusOption?.color }]}>
          <View style={styles.statusHeader}>
            <Text style={[styles.statusTitle, { color: statusOption?.color, backgroundColor: statusOption?.backgroundColor }]}>
              {statusOption?.label}
            </Text>
            <TouchableOpacity 
              onPress={() => togglePinOrder(order.id)}
              style={styles.pinButton}
            >
              {isPinned ? (
                <GhimEle2 width={20} height={20} />
              ) : (
                <GhimEle width={20} height={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.orderItem}>
            <Text style={styles.orderCode}>{order.code}</Text>
            <Text style={styles.orderDeadline}>Deadline: {order.deadline}</Text>

            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: '#FF811A26' }]}>
                <View style={[
                  styles.progressFill,
                  {
                    width: `${order.progress1}%`,
                    backgroundColor: '#FF811A'
                  }
                ]}>
                  <Text style={styles.progressText}>{order.progress1}%</Text>
                </View>
              </View>

              <View style={[styles.progressBar, { backgroundColor: '#0375F326' }]}>
                <View style={[
                  styles.progressFill,
                  {
                    width: `${order.progress2}%`,
                    backgroundColor: '#0375F3'
                  }
                ]}>
                  <Text style={styles.progressText}>{order.progress2}%</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => handleInfoPress(order)}>
                <InforIcon width={12} height={12} style={styles.infoIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={infoModalVisible && selectedOrder?.id === order.id}
          onRequestClose={() => setInfoModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setInfoModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>

              {/* Tiến độ Kế hoạch Nguyên liệu */}
              <View style={styles.progressInfoItem}>
                <View style={[styles.progressDot, styles.progressOrange]} />
                <Text style={styles.progressLabel}>Tiến độ Kế hoạch Nguyên liệu:</Text>
                <Text style={styles.progressValue}>{order.progress1}%</Text>
              </View>

              {/* Tiến độ Nhập kho Thành phẩm */}
              <View style={styles.progressInfoItem}>
                <View style={[styles.progressDot, styles.progressBlue]} />
                <Text style={styles.progressLabel}>Tiến độ Nhập kho Thành phẩm:</Text>
                <Text style={styles.progressValue}>{order.progress2}%</Text>
              </View>

              {/* Nút Đóng */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setInfoModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>

    );
  };

  const filteredOrders = orders.filter(order => statusFilters[order.status]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Menuline color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Lệnh Sản Xuất</Text>
        <Frame color="#fff" />
      </View>

      <TouchableWithoutFeedback
        onPress={() => menuVisible && setMenuVisible(false)}
        disabled={!menuVisible}
      >
        <View style={styles.mainContent}>
          {menuVisible && (
            <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
              <Text style={styles.headerText2}>Lệnh Sản Xuất</Text>
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm mã lệnh sản xuất"
                    placeholderTextColor="#888"
                    returnKeyType="search"
                  />
                  <TouchableOpacity style={styles.searchIconContainer}>
                    <Search height={20} width={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Status Filter */}
              <View style={styles.statusFilterSection}>
                <TouchableOpacity
                  style={styles.statusLabelContainer}
                  onPress={toggleDropdown}
                >
                  <View style={styles.statusLabelContent}>
                    <StatusIcon height={16} width={16} style={styles.statusIcon} />
                    <Text style={styles.statusLabel}>Trạng thái</Text>
                  </View>
                  <MaterialIcons
                    name={isDropdownVisible ? "arrow-drop-up" : "arrow-drop-down"}
                    size={24}
                    color="#9295A4"
                  />
                </TouchableOpacity>

                {isDropdownVisible && (
                  <View style={styles.dropdownContent}>
                    {statusOptions.map((item) => (
                      <TouchableOpacity
                        key={item.key}
                        style={styles.checkboxContainer}
                        onPress={() => toggleStatusFilter(item.key as keyof StatusFilters)}
                      >
                        <View style={[
                          styles.checkbox,
                          statusFilters[item.key as keyof StatusFilters] && styles.checked
                        ]}>
                          {statusFilters[item.key as keyof StatusFilters] && (
                            <Text style={styles.checkmark}>✓</Text>
                          )}
                        </View>
                        <Text style={[
                          styles.checkboxLabel,
                          {
                            color: item.color,
                            backgroundColor: `${item.color}33`,
                          }
                        ]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Orders List */}
              <View style={styles.productionSection}>
                <TouchableOpacity
                  style={styles.unpinButton}
                  onPress={unpinAllOrders}
                >
                  <Text style={styles.unpinText}>Bỏ ghim toàn bộ</Text>
                  <UnableghimIcon />
                </TouchableOpacity>

                <ScrollView
                  style={styles.scrollContainer}
                  contentContainerStyle={styles.scrollContentContainer}
                >
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map(renderOrderItem)
                  ) : (
                    <View style={styles.noOrdersContainer}>
                      <Text style={styles.noOrdersText}>Không có lệnh sản xuất nào</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            </Animated.View>
          )}

          {/* Empty State */}
          {!menuVisible && (
            <View style={styles.content}>
              <EmptyOrderSvg width={500} height={500} />
              <Text style={styles.description}>Chưa có Lệnh sản xuất.</Text>
              <TouchableOpacity style={styles.button}>
                <View style={styles.buttonContent}>
                  <Ghim width={16} height={16} />
                  <Text style={styles.buttonText}>Bắt đầu ghim lệnh ngay</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    padding: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  mainContent: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    padding: 16,
    width: 280,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 10,
  },
  headerText2: {
    fontFamily: 'LexendDeca-Medium',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: '#25388A',
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 12,
    color: '#333',
  },
  searchIconContainer: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  statusFilterSection: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#D0D5DD',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1
  },
  statusLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabelContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 8,
  },
  statusLabel: {
    fontSize: 14,
  },
  dropdownContent: {
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#1760B9',
    borderColor: '#1760B9',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    bottom: 5
  },
  checkboxLabel: {
    fontSize: 15,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  orderContainer: {
    marginBottom: 12,
  },
  statusGroup: {
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  pinnedOrder: {
    backgroundColor: '#F0F7FF',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 12,
    padding: 5,
    borderRadius: 8
  },
  orderItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  orderCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003DA0',
    marginBottom: 5
  },
  orderDeadline: {
    fontSize: 12,
    color: '#667085',
    marginBottom: 10
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    height: 15,
    width: '45%',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 7,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  productionSection: {
    flex: 1,
    marginBottom: 24,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  unpinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  unpinText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoIcon: {
    marginLeft: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    top: -100
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    top: -80
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noOrdersText: {
    fontSize: 16,
    color: '#6B7280',
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Hiệu ứng mờ nền
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
  },
  progressLabel: {
    fontSize: 16,
    flex: 1,
  },
  progressValue: {
    fontSize: 14,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  progressOrange: {
    backgroundColor: '#FF811A', // Màu cam cho 50%
  },
  progressBlue: {
    backgroundColor: '#0375F3', // Màu xanh cho 90%
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pinButton: {
    padding: 5, 
  }
});

export default ProductionOrderScreen;