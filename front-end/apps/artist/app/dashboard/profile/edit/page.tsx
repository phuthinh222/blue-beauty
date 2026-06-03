"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, X, Upload } from "lucide-react";
import { Button } from "@repo/ui/button";
import Image from "next/image";
import type { ArtistProfile } from "@/components/artist-profile/types";

const mockProfile: ArtistProfile = {
  id: "1",
  name: "Linh Nguyễn",
  district: "Quận 1",
  city: "TP. Hồ Chí Minh",
  rating: 4.9,
  coverPhoto: "/images/ngoaitroi.jpg",
  avatar: "/images/avatar.png",
  bio: "Makeup Artist chuyên về Bridal makeup, Natural makeup và Creative makeup. Tôi mong muốn mang đến cho bạn một trải nghiệm tuyệt vời và làm bạn cảm thấy tự tin nhất.",
  bookingArea: "Toàn TP. Hồ Chí Minh",
  workPrinciples: [
    "Tôn trọng ý kiến của khách hàng",
    "Sử dụng sản phẩm Cosmetics chất lượng cao",
    "Luôn cập nhật các xu hướng mới nhất",
    "Cam kết vệ sinh và chuyên nghiệp",
  ],
  stats: {
    profiles: 34,
    reviews: 28,
    services: 8,
    agreements: 156,
  },
  portfolio: [
    {
      label: "Makeup Artist",
      images: ["/images/makeup1.jpg", "/images/makeup2.jpg", "/images/makeup4.jpg"],
    },
    {
      label: "Concept",
      images: ["/images/item1.jpg", "/images/item2.jpg", "/images/item3.jpg"],
    },
    {
      label: "Motion",
      images: ["/images/ngoaitroi2.jpg", "/images/ngoaitroi3.jpg", "/images/ngoaitroi4.jpg"],
    },
  ],
  reviews: [],
  services: [
    {
      id: "s1",
      concept: "Bridal Makeup",
      price: 2500000,
      duration: "2-3 giờ",
      includes: ["Consultation", "Makeup", "Touch-up service"],
      description: ["Makeup cho cô dâu", "2 lần thử makeup", "Chỉnh sửa bất kỳ lúc nào trong ngày cưới"],
    },
    {
      id: "s2",
      concept: "Event Makeup",
      price: 1500000,
      duration: "1-2 giờ",
      includes: ["Consultation", "Makeup"],
      description: ["Makeup cho các sự kiện", "Phù hợp với từng dạo sự kiện"],
    },
  ],
};

interface PortfolioItem {
  label: string;
  images: string[];
}

interface Service {
  id: string;
  concept: string;
  price: number;
  duration: string;
  includes: string[];
  description: string[];
}

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: mockProfile.name,
    district: mockProfile.district,
    city: mockProfile.city,
    bio: mockProfile.bio,
    bookingArea: mockProfile.bookingArea,
    workPrinciples: mockProfile.workPrinciples.join("\n"),
  });
  const [coverPhoto, setCoverPhoto] = useState(mockProfile.coverPhoto);
  const [avatar, setAvatar] = useState(mockProfile.avatar);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(mockProfile.portfolio);
  const [services, setServices] = useState<Service[]>(mockProfile.services);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "bio" | "portfolio" | "services">("basic");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image upload handlers
  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCoverPhotoPreview(result);
        setCoverPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetCoverPhoto = () => {
    setCoverPhoto(mockProfile.coverPhoto);
    setCoverPhotoPreview(null);
  };

  const resetAvatar = () => {
    setAvatar(mockProfile.avatar);
    setAvatarPreview(null);
  };

  // Portfolio handlers
  const addPortfolioItem = () => {
    setPortfolio((prev) => [
      ...prev,
      { label: "Album mới", images: [] },
    ]);
  };

  const removePortfolioItem = (index: number) => {
    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePortfolioItem = (index: number, field: string, value: any) => {
    setPortfolio((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const addPortfolioImage = (index: number) => {
    setPortfolio((prev) => {
      const updated = [...prev];
      updated[index].images.push("");
      return updated;
    });
  };

  const removePortfolioImage = (itemIndex: number, imageIndex: number) => {
    setPortfolio((prev) => {
      const updated = [...prev];
      updated[itemIndex].images = updated[itemIndex].images.filter((_, i) => i !== imageIndex);
      return updated;
    });
  };

  const updatePortfolioImage = (itemIndex: number, imageIndex: number, value: string) => {
    setPortfolio((prev) => {
      const updated = [...prev];
      updated[itemIndex].images[imageIndex] = value;
      return updated;
    });
  };

  // Services handlers
  const addService = () => {
    setServices((prev) => [
      ...prev,
      {
        id: `s${Date.now()}`,
        concept: "Dịch vụ mới",
        price: 0,
        duration: "1 giờ",
        includes: [],
        description: [],
      },
    ]);
  };

  const removeService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: string, value: any) => {
    setServices((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const dataToSave = {
        ...formData,
        workPrinciples: formData.workPrinciples.split("\n").filter((p) => p.trim()),
        avatar,
        coverPhoto,
        portfolio,
        services,
      };
      console.log("Saving profile:", dataToSave);

      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push("/dashboard/profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-slate-900">Chỉnh sửa hồ sơ</h1>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">{isSaving ? "Đang lưu..." : "Lưu"}</span>
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-14 z-10 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto">
          {[
            { id: "basic", label: "Thông tin cơ bản" },
            { id: "bio", label: "Tiểu sử" },
            { id: "portfolio", label: "Portfolio" },
            { id: "services", label: "Dịch vụ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="space-y-6">
            {/* Avatar & Cover Photo Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Ảnh đại diện & Ảnh bìa</h2>

              {/* Cover Photo */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Ảnh bìa
                </label>
                <div className="mb-4">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-300 bg-slate-100">
                    {coverPhotoPreview ? (
                      <Image
                        src={coverPhotoPreview}
                        alt="Cover photo preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src={coverPhoto}
                        alt="Cover photo"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverPhotoChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 w-full cursor-pointer"
                      onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      Chọn ảnh bìa
                    </Button>
                  </label>
                  {coverPhotoPreview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetCoverPhoto}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Ảnh đại diện
                </label>
                <div className="mb-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-300 mx-auto bg-slate-100">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src={avatar}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 w-full cursor-pointer"
                      onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      Chọn ảnh đại diện
                    </Button>
                  </label>
                  {avatarPreview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetAvatar}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Thông tin cơ bản</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Tên của bạn
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Nhập tên của bạn"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-slate-700 mb-2">
                      Quận/Huyện
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="Nhập quận/huyện"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                      Thành phố
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="Nhập thành phố"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bio Tab */}
        {activeTab === "bio" && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Giới thiệu về bạn</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-2">
                  Tiểu sử nghề nghiệp
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                  placeholder="Nhập tiểu sử về bạn"
                />
              </div>

              <div>
                <label htmlFor="bookingArea" className="block text-sm font-medium text-slate-700 mb-2">
                  Khu vực phục vụ
                </label>
                <input
                  type="text"
                  id="bookingArea"
                  name="bookingArea"
                  value={formData.bookingArea}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="Nhập khu vực phục vụ"
                />
              </div>

              <div>
                <label htmlFor="workPrinciples" className="block text-sm font-medium text-slate-700 mb-2">
                  Nguyên tắc làm việc (mỗi dòng một nguyên tắc)
                </label>
                <textarea
                  id="workPrinciples"
                  name="workPrinciples"
                  value={formData.workPrinciples}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                  placeholder="Nhập các nguyên tắc làm việc, mỗi dòng một nguyên tắc"
                />
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            {portfolio.map((item, index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updatePortfolioItem(index, "label", e.target.value)}
                    className="text-lg font-semibold text-slate-900 px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePortfolioItem(index)}
                    className="gap-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3 mb-4">
                  {item.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => updatePortfolioImage(index, imgIndex, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                        placeholder="Nhập đường dẫn ảnh"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePortfolioImage(index, imgIndex)}
                        className="gap-2 text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPortfolioImage(index)}
                  className="gap-2 w-full"
                >
                  <Plus className="h-4 w-4" />
                  Thêm ảnh
                </Button>
              </div>
            ))}

            <Button
              variant="default"
              onClick={addPortfolioItem}
              className="gap-2 w-full"
            >
              <Plus className="h-4 w-4" />
              Thêm album
            </Button>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={service.id} className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={service.concept}
                    onChange={(e) => updateService(index, "concept", e.target.value)}
                    className="text-lg font-semibold text-slate-900 px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeService(index)}
                    className="gap-2 text-red-600 hover:bg-red-50 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Giá (VND)
                    </label>
                    <input
                      type="number"
                      value={service.price}
                      onChange={(e) => updateService(index, "price", parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Thời gian
                    </label>
                    <input
                      type="text"
                      value={service.duration}
                      onChange={(e) => updateService(index, "duration", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="1-2 giờ"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mô tả (mỗi dòng một điểm)
                  </label>
                  <textarea
                    value={service.description.join("\n")}
                    onChange={(e) => updateService(index, "description", e.target.value.split("\n"))}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                    placeholder="Nhập mô tả dịch vụ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bao gồm (mỗi dòng một mục)
                  </label>
                  <textarea
                    value={service.includes.join("\n")}
                    onChange={(e) => updateService(index, "includes", e.target.value.split("\n"))}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                    placeholder="Nhập các mục bao gồm"
                  />
                </div>
              </div>
            ))}

            <Button
              variant="default"
              onClick={addService}
              className="gap-2 w-full"
            >
              <Plus className="h-4 w-4" />
              Thêm dịch vụ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Portfolio handlers
  const addPortfolioItem = () => {
    setPortfolio((prev) => [
      ...prev,
      { label: "Album mới", images: [] },
    ]);
  };

  const removePortfolioItem = (index: number) => {
    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePortfolioItem = (index: number, field: string, value: any) => {
    setPortfolio((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const addPortfolioImage = (index: number) => {
    setPortfolio((prev) => {
      const updated = [...prev];
      updated[index].images.push("");
      return updated;
    });
  };

  const removePortfolioImage = (itemIndex: number, imageIndex: number) => {
    setPortfolio((prev) => {
      const updated = [...prev];
      updated[itemIndex].images = updated[itemIndex].images.filter((_, i) => i !== imageIndex);
      return updated;
    });
  };

  const updatePortfolioImage = (itemIndex: number, imageIndex: number, value: string) => {
    setPortfolio((prev) => {
      const updated = [...prev];
      updated[itemIndex].images[imageIndex] = value;
      return updated;
    });
  };

  // Services handlers
  const addService = () => {
    setServices((prev) => [
      ...prev,
      {
        id: `s${Date.now()}`,
        concept: "Dịch vụ mới",
        price: 0,
        duration: "1 giờ",
        includes: [],
        description: [],
      },
    ]);
  };

  const removeService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: string, value: any) => {
    setServices((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const dataToSave = {
        ...formData,
        workPrinciples: formData.workPrinciples.split("\n").filter((p) => p.trim()),
        portfolio,
        services,
      };
      console.log("Saving profile:", dataToSave);

      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push("/dashboard/profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-slate-900">Chỉnh sửa hồ sơ</h1>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">{isSaving ? "Đang lưu..." : "Lưu"}</span>
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-14 z-10 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto">
          {[
            { id: "basic", label: "Thông tin cơ bản" },
            { id: "bio", label: "Tiểu sử" },
            { id: "portfolio", label: "Portfolio" },
            { id: "services", label: "Dịch vụ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-slate-700 mb-2">
                    Quận/Huyện
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Nhập quận/huyện"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                    Thành phố
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Nhập thành phố"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bio Tab */}
        {activeTab === "bio" && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Giới thiệu về bạn</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-2">
                  Tiểu sử nghề nghiệp
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                  placeholder="Nhập tiểu sử về bạn"
                />
              </div>

              <div>
                <label htmlFor="bookingArea" className="block text-sm font-medium text-slate-700 mb-2">
                  Khu vực phục vụ
                </label>
                <input
                  type="text"
                  id="bookingArea"
                  name="bookingArea"
                  value={formData.bookingArea}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="Nhập khu vực phục vụ"
                />
              </div>

              <div>
                <label htmlFor="workPrinciples" className="block text-sm font-medium text-slate-700 mb-2">
                  Nguyên tắc làm việc (mỗi dòng một nguyên tắc)
                </label>
                <textarea
                  id="workPrinciples"
                  name="workPrinciples"
                  value={formData.workPrinciples}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                  placeholder="Nhập các nguyên tắc làm việc, mỗi dòng một nguyên tắc"
                />
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            {portfolio.map((item, index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updatePortfolioItem(index, "label", e.target.value)}
                    className="text-lg font-semibold text-slate-900 px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePortfolioItem(index)}
                    className="gap-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3 mb-4">
                  {item.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => updatePortfolioImage(index, imgIndex, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                        placeholder="Nhập đường dẫn ảnh"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePortfolioImage(index, imgIndex)}
                        className="gap-2 text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPortfolioImage(index)}
                  className="gap-2 w-full"
                >
                  <Plus className="h-4 w-4" />
                  Thêm ảnh
                </Button>
              </div>
            ))}

            <Button
              variant="default"
              onClick={addPortfolioItem}
              className="gap-2 w-full"
            >
              <Plus className="h-4 w-4" />
              Thêm album
            </Button>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={service.id} className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={service.concept}
                    onChange={(e) => updateService(index, "concept", e.target.value)}
                    className="text-lg font-semibold text-slate-900 px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeService(index)}
                    className="gap-2 text-red-600 hover:bg-red-50 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Giá (VND)
                    </label>
                    <input
                      type="number"
                      value={service.price}
                      onChange={(e) => updateService(index, "price", parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Thời gian
                    </label>
                    <input
                      type="text"
                      value={service.duration}
                      onChange={(e) => updateService(index, "duration", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="1-2 giờ"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mô tả (mỗi dòng một điểm)
                  </label>
                  <textarea
                    value={service.description.join("\n")}
                    onChange={(e) => updateService(index, "description", e.target.value.split("\n"))}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                    placeholder="Nhập mô tả dịch vụ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bao gồm (mỗi dòng một mục)
                  </label>
                  <textarea
                    value={service.includes.join("\n")}
                    onChange={(e) => updateService(index, "includes", e.target.value.split("\n"))}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                    placeholder="Nhập các mục bao gồm"
                  />
                </div>
              </div>
            ))}

            <Button
              variant="default"
              onClick={addService}
              className="gap-2 w-full"
            >
              <Plus className="h-4 w-4" />
              Thêm dịch vụ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

