"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Yangilik } from "@/lib/types";

const kategoriyalar = ["Umumiy", "Futbol", "Basketbol", "Voleybol", "Musobaqa", "Yutuqlar"];

export function YangiliklarPage() {
  const { yangiliklar, addYangilik, updateYangilik, deleteYangilik, likeYangilik } = useApp();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModal, setEditModal] = useState<Yangilik | null>(null);
  const [formData, setFormData] = useState({
    sarlavha: "",
    mazmun: "",
    kategoriya: "Umumiy",
    rasm_emoji: "📰",
  });

  const resetForm = () => {
    setFormData({
      sarlavha: "",
      mazmun: "",
      kategoriya: "Umumiy",
      rasm_emoji: "📰",
    });
  };

  const handleAdd = () => {
    addYangilik({
      sarlavha: formData.sarlavha,
      mazmun: formData.mazmun,
      kategoriya: formData.kategoriya,
      rasm_emoji: formData.rasm_emoji,
      sana: new Date().toISOString().split("T")[0],
      layklar: 0,
      izohlar_soni: 0,
    });
    resetForm();
    setAddModalOpen(false);
  };

  const handleUpdate = () => {
    if (!editModal) return;
    updateYangilik(editModal.id, {
      sarlavha: formData.sarlavha,
      mazmun: formData.mazmun,
      kategoriya: formData.kategoriya,
      rasm_emoji: formData.rasm_emoji,
    });
    resetForm();
    setEditModal(null);
  };

  const openEditModal = (yangilik: Yangilik) => {
    setFormData({
      sarlavha: yangilik.sarlavha,
      mazmun: yangilik.mazmun,
      kategoriya: yangilik.kategoriya,
      rasm_emoji: yangilik.rasm_emoji,
    });
    setEditModal(yangilik);
  };

  const handleDelete = (id: number) => {
    if (confirm("Haqiqatan ham bu yangilikni o'chirmoqchimisiz?")) {
      deleteYangilik(id);
    }
  };

  const handleLike = (id: number) => {
    likeYangilik(id);
  };

  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Sarlavha *
        </label>
        <Input
          value={formData.sarlavha}
          onChange={(e) => setFormData({ ...formData, sarlavha: e.target.value })}
          placeholder="Yangilik sarlavhasi"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Mazmun *
        </label>
        <Textarea
          value={formData.mazmun}
          onChange={(e) => setFormData({ ...formData, mazmun: e.target.value })}
          placeholder="Yangilik matni..."
          rows={6}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Kategoriya
          </label>
          <Select
            value={formData.kategoriya}
            onValueChange={(value) => setFormData({ ...formData, kategoriya: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {kategoriyalar.map((k) => (
                <SelectItem key={k} value={k}>
                  {k}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Emoji
          </label>
          <Input
            value={formData.rasm_emoji}
            onChange={(e) => setFormData({ ...formData, rasm_emoji: e.target.value })}
            maxLength={2}
          />
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <Button
          className={`flex-1 ${isEdit ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}`}
          onClick={isEdit ? handleUpdate : handleAdd}
          disabled={!formData.sarlavha || !formData.mazmun}
        >
          {isEdit ? "Saqlash" : "Qo'shish"}
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            resetForm();
            setAddModalOpen(false);
            setEditModal(null);
          }}
        >
          Bekor qilish
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Yangiliklar
        </h1>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              <span className="mr-2">📰</span> Yangilik qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>📰 Yangilik qo'shish</DialogTitle>
            </DialogHeader>
            <FormContent />
          </DialogContent>
        </Dialog>
      </div>

      {/* News List */}
      <div className="space-y-6">
        {yangiliklar.map((yangilik) => (
          <Card
            key={yangilik.id}
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {yangilik.rasm_emoji}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(yangilik)}
                    className="text-xl hover:scale-110 transition-transform"
                    title="Tahrirlash"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(yangilik.id)}
                    className="text-xl hover:scale-110 transition-transform"
                    title="O'chirish"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {yangilik.sarlavha}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-3">
                {yangilik.mazmun}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                    {yangilik.kategoriya}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    📅 {yangilik.sana}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {yangiliklar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📰</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday yangilik topilmadi
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={!!editModal} onOpenChange={() => setEditModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>✏️ Yangilikni tahrirlash</DialogTitle>
          </DialogHeader>
          <FormContent isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
}
