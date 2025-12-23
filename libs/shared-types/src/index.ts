// ============================================================================
// ENUMS (matching Prisma schema)
// ============================================================================

export enum Role {
    ADMIN = 'ADMIN',
    VENDOR = 'VENDOR',
    CUSTOMER = 'CUSTOMER',
}

export enum Platform {
    LOCAL = 'LOCAL',
    TRENDYOL = 'TRENDYOL',
    HEPSIBURADA = 'HEPSIBURADA',
    N11 = 'N11',
    AMAZON = 'AMAZON',
}

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}

export enum SyncStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    SYNCED = 'SYNCED',
    ERROR = 'ERROR',
    DISABLED = 'DISABLED',
}

export enum CargoProvider {
    YURTICI = 'YURTICI',
    ARAS = 'ARAS',
    MNG = 'MNG',
    PTT = 'PTT',
}

export enum ShipmentStatus {
    PENDING = 'PENDING',
    LABEL_CREATED = 'LABEL_CREATED',
    PICKED_UP = 'PICKED_UP',
    IN_TRANSIT = 'IN_TRANSIT',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
}

export enum BulkOperationType {
    PRODUCT_IMPORT = 'PRODUCT_IMPORT',
    STOCK_UPDATE = 'STOCK_UPDATE',
    PRICE_UPDATE = 'PRICE_UPDATE',
    MARKETPLACE_SYNC = 'MARKETPLACE_SYNC',
}

export enum BulkOperationStatus {
    QUEUED = 'QUEUED',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    PARTIALLY_COMPLETED = 'PARTIALLY_COMPLETED',
}

// ============================================================================
// DTOs
// ============================================================================

// Auth DTOs
export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
}

export interface AuthResponse {
    accessToken: string;
    user: UserDto;
}

export interface UserDto {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: Role;
    isActive: boolean;
}

// Product DTOs
export interface CreateProductDto {
    name: string;
    slug: string;
    description?: string;
    categoryId?: string;
    brand?: string;
    variants: CreateVariantDto[];
}

export interface CreateVariantDto {
    sku: string;
    barcode?: string;
    stock: number;
    price: number;
    compareAtPrice?: number;
    costPrice?: number;
    weight?: number;
    attributes?: { key: string; value: string }[];
    images?: { url: string; alt?: string; order: number }[];
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    categoryId?: string;
    brand?: string;
    isActive?: boolean;
}

export interface UpdateVariantDto {
    stock?: number;
    price?: number;
    compareAtPrice?: number;
    isActive?: boolean;
}

export interface ProductDto {
    id: string;
    name: string;
    slug: string;
    description?: string;
    categoryId?: string;
    brand?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    category?: CategoryDto;
    variants: VariantDto[];
}

export interface VariantDto {
    id: string;
    productId: string;
    sku: string;
    barcode?: string;
    stock: number;
    price: number;
    compareAtPrice?: number;
    costPrice?: number;
    weight?: number;
    isActive: boolean;
    attributes: VariantAttributeDto[];
    images: VariantImageDto[];
}

export interface VariantAttributeDto {
    key: string;
    value: string;
}

export interface VariantImageDto {
    url: string;
    alt?: string;
    order: number;
}

export interface CategoryDto {
    id: string;
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
    order: number;
    isActive: boolean;
}

// Order DTOs
export interface CreateOrderDto {
    platform?: Platform;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: OrderItemDto[];
    shippingAddress: ShippingAddressDto;
    notes?: string;
}

export interface OrderItemDto {
    variantId: string;
    quantity: number;
    price: number;
}

export interface ShippingAddressDto {
    fullName: string;
    phone: string;
    address: string;
    district: string;
    city: string;
    country?: string;
    postalCode?: string;
}

export interface OrderDto {
    id: string;
    orderNumber: string;
    platform: Platform;
    platformOrderId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
    currency: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    items: OrderItemDetailDto[];
    shippingAddress?: ShippingAddressDto;
    shipments?: ShipmentDto[];
}

export interface OrderItemDetailDto {
    id: string;
    sku: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface ShipmentDto {
    id: string;
    provider: CargoProvider;
    trackingCode: string;
    labelUrl?: string;
    status: ShipmentStatus;
    estimatedDelivery?: string;
    actualDelivery?: string;
}

// Marketplace Integration DTOs
export interface MarketplaceCredentialsDto {
    platform: Platform;
    apiKey: string;
    apiSecret?: string;
    supplierId?: string;
    merchantId?: string;
}

export interface CategoryMappingDto {
    localCategoryId: string;
    platform: Platform;
    platformCategoryId: string;
    platformCategory: string;
}

export interface SyncProductDto {
    variantIds: string[];
    platform: Platform;
}

export interface MarketplaceSyncDto {
    id: string;
    variantId: string;
    platform: Platform;
    platformProductId?: string;
    platformSku?: string;
    status: SyncStatus;
    lastSyncAt?: string;
    lastErrorMessage?: string;
}

// Bulk Operations DTOs
export interface BulkUploadDto {
    file: File;
    type: BulkOperationType;
}

export interface BulkOperationDto {
    id: string;
    type: BulkOperationType;
    status: BulkOperationStatus;
    totalItems: number;
    processedItems: number;
    successItems: number;
    failedItems: number;
    errors?: any[];
    fileUrl?: string;
    resultUrl?: string;
    startedAt?: string;
    completedAt?: string;
    createdAt: string;
}

export interface BulkOperationProgressDto {
    operationId: string;
    status: BulkOperationStatus;
    progress: number; // 0-100
    processedItems: number;
    totalItems: number;
    currentItem?: string;
}

// Audit Log DTOs
export interface AuditLogDto {
    id: string;
    userId: string;
    action: string;
    entity: string;
    entityId: string;
    oldValue?: any;
    newValue?: any;
    createdAt: string;
}

export interface AuditLogFilterDto {
    userId?: string;
    entity?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

// Pagination
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// API Response
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
}
